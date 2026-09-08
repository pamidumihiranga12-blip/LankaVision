from http.server import BaseHTTPRequestHandler
import json
import urllib.request
import urllib.error

FIREBASE_WEB_API_KEY = "AIzaSyDaKFHWjMFfabGw0l1NILs_kb8hF5FCRhU"

class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_POST(self):
        content_length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_length).decode("utf-8")
        try:
            data = json.loads(body)
            email = data.get("email", "").strip()
            password = data.get("password", "").strip()

            if not email or not password:
                self._send_json(400, {"success": False, "error": "Email and password are required"})
                return

            url = f"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key={FIREBASE_WEB_API_KEY}"
            payload = json.dumps({"email": email, "password": password, "returnSecureToken": True}).encode("utf-8")

            req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"}, method="POST")
            with urllib.request.urlopen(req, timeout=15) as resp:
                resp_data = json.loads(resp.read().decode("utf-8"))
                new_uid = resp_data.get("localId")

            self._send_json(200, {"success": True, "uid": new_uid})
        except urllib.error.HTTPError as he:
            err_body = he.read().decode("utf-8")
            try:
                err_json = json.loads(err_body)
                msg = err_json.get("error", {}).get("message", "Failed to create user")
            except Exception:
                msg = err_body
            self._send_json(400, {"success": False, "error": msg})
        except Exception as e:
            self._send_json(500, {"success": False, "error": str(e)})

    def _send_json(self, status, obj):
        res = json.dumps(obj).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Content-Length", str(len(res)))
        self.end_headers()
        self.wfile.write(res)
