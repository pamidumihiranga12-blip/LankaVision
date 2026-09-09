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
import time
import os
import sys

# Ensure UTF-8 encoding on Windows console/log streams
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.header import Header
import email.utils

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
    """Sends an email synchronously using SMTP_SSL with clean per-recipient headers and fallback."""
    if isinstance(to_addresses, str):
        to_addresses = [to_addresses]

    valid_recipients = [e.strip() for e in to_addresses if e and "@" in e]
    if not valid_recipients:
        return False, "No valid recipient email addresses provided."

    context = ssl.create_default_context()
    sent_count = 0
    errors = []

    try:
        with smtplib.SMTP_SSL(SMTP_CONFIG["server"], SMTP_CONFIG["port"], context=context, timeout=15) as server:
            server.login(SMTP_CONFIG["user"], SMTP_CONFIG["password"])
            for idx, recipient in enumerate(valid_recipients):
                if idx > 0:
                    time.sleep(2.0)

                # Construct clean message for this specific recipient so envelope matches To: header
                msg = MIMEMultipart("alternative")
                msg["From"] = f"{SMTP_CONFIG['sender_name']} <{SMTP_CONFIG['from_email']}>"
                msg["To"] = recipient
                msg["Subject"] = Header(subject, "utf-8")
                msg["Date"] = email.utils.formatdate(localtime=True)
                msg["Message-ID"] = email.utils.make_msgid(domain="smartzonelk.lk")
                msg["Reply-To"] = SMTP_CONFIG["from_email"]

                plain_part = text_content or "LankaVision Pro System Notification"
                msg.attach(MIMEText(plain_part, "plain", "utf-8"))
                if html_content:
                    msg.attach(MIMEText(html_content, "html", "utf-8"))

                for attempt in range(2):
                    try:
                        server.sendmail(SMTP_CONFIG["from_email"], [recipient], msg.as_string())
                        sent_count += 1
                        break
                    except Exception as rec_err:
                        err_str = str(rec_err)
                        if attempt == 0 and ("550" in err_str or "suspicious" in err_str.lower()):
                            time.sleep(3.0)
                            try:
                                server.rset()
                            except Exception:
                                pass
                            try:
                                fallback_msg = (
                                    f"From: {SMTP_CONFIG['sender_name']} <{SMTP_CONFIG['from_email']}>\r\n"
                                    f"To: {recipient}\r\n"
                                    f"Subject: {subject}\r\n"
                                    f"Content-Type: text/plain; charset=utf-8\r\n\r\n"
                                    f"{plain_part}"
                                )
                                server.sendmail(SMTP_CONFIG["from_email"], [recipient], fallback_msg.encode("utf-8"))
                                sent_count += 1
                                break
                            except Exception:
                                pass
                        if attempt == 1:
                            errors.append(f"{recipient}: {rec_err}")
    except Exception as err:
        try:
            print(f"[EMAIL ERROR] Connection failed for {valid_recipients}: {err}", flush=True)
        except Exception:
            pass
        return False, str(err)

    if sent_count > 0:
        try:
            print(f"[EMAIL] Sent successfully to {sent_count} recipients: {valid_recipients} | Subject: {subject}", flush=True)
        except Exception:
            pass
        return True, "Email sent successfully"
    else:
        return False, "; ".join(errors) or "Failed to send email"



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

        elif self.path == "/api/create-admin":
            content_length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(content_length).decode("utf-8")

            try:
                data = json.loads(body)
                email = data.get("email", "").strip()
                password = data.get("password", "").strip()

                if not email or not password or len(password) < 6:
                    self._send_json_response(400, {"success": False, "error": "Email and password (min 6 chars) required."})
                    return

                # Create in Firebase Auth via Google Identity Toolkit REST API
                api_key = "AIzaSyDaKFHWjMFfabGw0l1NILs_kb8hF5FCRhU"
                import urllib.request
                import urllib.error

                req_url = f"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key={api_key}"
                req_data = json.dumps({"email": email, "password": password, "returnSecureToken": True}).encode("utf-8")
                req = urllib.request.Request(req_url, data=req_data, headers={"Content-Type": "application/json"})

                try:
                    with urllib.request.urlopen(req) as resp:
                        fb_res = json.loads(resp.read().decode("utf-8"))
                        uid = fb_res.get("localId")
                        self._send_json_response(200, {"success": True, "uid": uid})
                except urllib.error.HTTPError as he:
                    err_body = json.loads(he.read().decode("utf-8"))
                    msg = err_body.get("error", {}).get("message", "Failed to create user in Firebase Auth")
                    self._send_json_response(400, {"success": False, "error": msg})

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
    # Allow address reuse and multi-threaded request processing
    socketserver.ThreadingTCPServer.allow_reuse_address = True
    with socketserver.ThreadingTCPServer(("", PORT), LankaVisionRequestHandler) as httpd:
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
