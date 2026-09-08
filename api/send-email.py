from http.server import BaseHTTPRequestHandler
import json
import ssl
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.header import Header
import email.utils

SMTP_CONFIG = {
    "server": "smtp.smartzonelk.lk",
    "port": 465,
    "user": "lankavision@smartzonelk.lk",
    "password": "lanka@12345",
    "sender_name": "LankaVision Pro",
    "from_email": "lankavision@smartzonelk.lk"
}

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
            to_addr = data.get("to")
            subject = data.get("subject", "LankaVision Notification")
            html = data.get("html", "")
            text = data.get("text", "")

            if not to_addr:
                self._send_json(400, {"success": False, "error": "Missing 'to' address"})
                return

            if isinstance(to_addr, str):
                to_addr = [to_addr]
            valid_recipients = [e.strip() for e in to_addr if e and "@" in e]

            if not valid_recipients:
                self._send_json(400, {"success": False, "error": "No valid recipients"})
                return

            msg = MIMEMultipart("alternative")
            msg["Subject"] = Header(subject, "utf-8").encode()
            sender_header = Header(SMTP_CONFIG["sender_name"], "utf-8").encode()
            msg["From"] = f"{sender_header} <{SMTP_CONFIG['from_email']}>"
            msg["To"] = ", ".join(valid_recipients)
            msg["Date"] = email.utils.formatdate(localtime=True)
            msg["Message-ID"] = email.utils.make_msgid(domain="smartzonelk.lk")
            msg["Reply-To"] = SMTP_CONFIG["from_email"]
            msg["X-Mailer"] = "LankaVision Pro Mailer"
            msg["Auto-Submitted"] = "auto-generated"
            msg["X-Auto-Response-Suppress"] = "All"

            if text:
                msg.attach(MIMEText(text, "plain", "utf-8"))
            if html:
                msg.attach(MIMEText(html, "html", "utf-8"))

            context = ssl.create_default_context()
            with smtplib.SMTP_SSL(SMTP_CONFIG["server"], SMTP_CONFIG["port"], context=context, timeout=15) as s:
                s.login(SMTP_CONFIG["user"], SMTP_CONFIG["password"])
                s.sendmail(SMTP_CONFIG["from_email"], valid_recipients, msg.as_bytes())

            self._send_json(200, {"success": True, "message": "Email sent successfully", "recipients": valid_recipients})
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
