const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Helper to get Service Account
function getServiceAccount() {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    try {
      return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    } catch (e) {
      console.warn('Failed to parse FIREBASE_SERVICE_ACCOUNT env:', e.message);
    }
  }
  const possiblePaths = [
    path.join(__dirname, '..', 'serviceAccountKey.json'),
    path.join(__dirname, 'serviceAccountKey.json'),
    path.join(process.cwd(), 'serviceAccountKey.json')
  ];
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      try {
        return JSON.parse(fs.readFileSync(p, 'utf8'));
      } catch (e) {
        console.warn('Failed reading', p, e.message);
      }
    }
  }
  return null;
}

// Generate Google OAuth2 Bearer Access Token via RS256 signed JWT
async function getGoogleAccessToken(sa) {
  const now = Math.floor(Date.now() / 1000);
  const jwtHeader = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
  const jwtClaim = Buffer.from(JSON.stringify({
    iss: sa.client_email,
    sub: sa.client_email,
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
    scope: 'https://www.googleapis.com/auth/identitytoolkit https://www.googleapis.com/auth/cloud-platform'
  })).toString('base64url');

  const signer = crypto.createSign('RSA-SHA256');
  signer.update(`${jwtHeader}.${jwtClaim}`);
  const signature = signer.sign(sa.private_key, 'base64url');
  const assertion = `${jwtHeader}.${jwtClaim}.${signature}`;

  const tokenResp = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${assertion}`
  });

  const tokenData = await tokenResp.json();
  if (!tokenData.access_token) {
    throw new Error(tokenData.error_description || tokenData.error || 'Failed to obtain Google access token');
  }
  return tokenData.access_token;
}

// Update password for email in Firebase Auth
async function updateFirebasePassword(sa, email, newPassword) {
  const token = await getGoogleAccessToken(sa);
  const projectId = sa.project_id || 'srmobile-6091e';

  // 1. Look up user by email
  const lookupResp = await fetch(`https://identitytoolkit.googleapis.com/v1/projects/${projectId}/accounts:lookup`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: [email] })
  });

  const lookupData = await lookupResp.json();
  const users = lookupData.users || [];
  if (!users.length) {
    throw new Error('මෙම Email ලිපිනය සමඟ ලියාපදිංචි පරිශීලකයෙකු හමු නොවීය (User not found).');
  }

  const uid = users[0].localId;

  // 2. Update user password
  const updateResp = await fetch(`https://identitytoolkit.googleapis.com/v1/projects/${projectId}/accounts/${uid}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      localId: uid,
      password: newPassword
    })
  });

  const updateData = await updateResp.json();
  if (updateData.error) {
    throw new Error(updateData.error.message || 'Failed to update password');
  }

  return { success: true, uid };
}

// Export handler for Vercel and Node.js HTTP servers
module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    return res.end();
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    return res.end(JSON.stringify({ success: false, error: 'Method not allowed' }));
  }

  // Parse body if not parsed
  let body = req.body;
  if (!body) {
    try {
      const buffers = [];
      for await (const chunk of req) {
        buffers.push(chunk);
      }
      const raw = Buffer.concat(buffers).toString('utf8');
      body = JSON.parse(raw);
    } catch (e) {
      res.statusCode = 400;
      return res.end(JSON.stringify({ success: false, error: 'Invalid JSON body' }));
    }
  }

  const { email, newPassword } = body || {};
  if (!email || !newPassword) {
    res.statusCode = 400;
    return res.end(JSON.stringify({ success: false, error: 'Email and new password are required' }));
  }

  if (newPassword.length < 6) {
    res.statusCode = 400;
    return res.end(JSON.stringify({ success: false, error: 'Password must be at least 6 characters' }));
  }

  const sa = getServiceAccount();
  if (!sa) {
    res.statusCode = 500;
    return res.end(JSON.stringify({
      success: false,
      error: 'server_key_missing',
      message: 'Server missing serviceAccountKey.json to update Firebase Auth.'
    }));
  }

  try {
    const result = await updateFirebasePassword(sa, email.trim(), newPassword.trim());
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ success: true, message: 'Password updated successfully' }));
  } catch (err) {
    console.error('Password reset backend error:', err);
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ success: false, error: err.message }));
  }
};
