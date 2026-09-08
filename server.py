"""
LankaVision Pro - Integrated Web Server & Email Dispatcher
Serves static files on port 8080 and handles POST /api/send-email using custom SMTP.
"""

import http.server
import socketserver
import json
import ssl
import smtplib
import threading
import os
import sys
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

SMTP_CONFIG = {
    "server": "smtp.smartzonelk.lk",
    "port": 465,
    "user": "lankavision@smartzonelk.lk",
    "password": "lanka@12345",
    "sender_name": "LankaVision Pro",
    "from_email": "lankavision@smartzonelk.lk"
}


def send_smtp_email(to_addresses, subject, html_content, text_content=""):
    """Sends an email synchronously using SMTP_SSL."""
    if isinstance(to_addresses, str):
        to_addresses = [to_addresses]

    valid_recipients = [e.strip() for e in to_addresses if e and "@" in e]
    if not valid_recipients:
        return False, "No valid recipient email addresses provided."

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = f"{SMTP_CONFIG['sender_name']} <{SMTP_CONFIG['from_email']}>"
    msg["To"] = ", ".join(valid_recipients)

    if text_content:
        msg.attach(MIMEText(text_content, "plain", "utf-8"))
    if html_content:
        msg.attach(MIMEText(html_content, "html", "utf-8"))

    context = ssl.create_default_context()
    try:
        with smtplib.SMTP_SSL(SMTP_CONFIG["server"], SMTP_CONFIG["port"], context=context, timeout=15) as server:
            server.login(SMTP_CONFIG["user"], SMTP_CONFIG["password"])
            server.sendmail(SMTP_CONFIG["from_email"], valid_recipients, msg.as_string())
        print(f"[EMAIL] Sent successfully to: {valid_recipients} | Subject: {subject}")
        return True, "Email sent successfully"
    except Exception as err:
        print(f"[EMAIL ERROR] Failed sending to {valid_recipients}: {err}")
        return False, str(err)


class LankaVisionRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_POST(self):
        if self.path == "/api/send-email":
            content_length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(content_length).decode("utf-8")

            try:
                data = json.loads(body)
                to_addr = data.get("to")
                subject = data.get("subject", "LankaVision Notification")
                html = data.get("html", "")
                text = data.get("text", "")

                if not to_addr:
                    self._send_json_response(400, {"success": False, "error": "Missing 'to' address"})
                    return

                # Async dispatch so client request completes immediately without lag
                def worker():
                    send_smtp_email(to_addr, subject, html, text)

                t = threading.Thread(target=worker, daemon=True)
                t.start()

                self._send_json_response(200, {
                    "success": True,
                    "message": "Email queued for delivery",
                    "recipients": to_addr if isinstance(to_addr, list) else [to_addr]
                })

            except json.JSONDecodeError:
                self._send_json_response(400, {"success": False, "error": "Invalid JSON"})
            except Exception as e:
                self._send_json_response(500, {"success": False, "error": str(e)})
        else:
            self.send_error(404, "Endpoint not found")

    def _send_json_response(self, status_code, data):
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(json.dumps(data).encode("utf-8"))


if __name__ == "__main__":
    # Allow address reuse
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), LankaVisionRequestHandler) as httpd:
        print(f"=================================================")
        print(f" LankaVision Pro Server running at:")
        print(f" http://localhost:{PORT}")
        print(f" SMTP: {SMTP_CONFIG['user']} ({SMTP_CONFIG['server']}:{SMTP_CONFIG['port']})")
        print(f"=================================================")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer shutting down.")
            httpd.server_close()
