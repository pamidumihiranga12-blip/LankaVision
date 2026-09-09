from http.server import BaseHTTPRequestHandler
import json
import ssl
import smtplib
import time
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

            plain_body = text or "LankaVision Pro Notification"
            context = ssl.create_default_context()
            sent_count = 0
            errors = []

            with smtplib.SMTP_SSL(SMTP_CONFIG["server"], SMTP_CONFIG["port"], context=context, timeout=15) as s:
                s.login(SMTP_CONFIG["user"], SMTP_CONFIG["password"])

                for idx, recipient in enumerate(valid_recipients):
                    if idx > 0:
                        # 2 second pause between multiple recipients to respect host rate limit
                        time.sleep(2.0)

                    msg = MIMEMultipart("alternative")
                    msg["From"] = f"{SMTP_CONFIG['sender_name']} <{SMTP_CONFIG['from_email']}>"
                    msg["To"] = recipient
                    msg["Subject"] = Header(subject, "utf-8")
                    msg["Date"] = email.utils.formatdate(localtime=True)
                    msg["Message-ID"] = email.utils.make_msgid(domain="smartzonelk.lk")
                    msg["Reply-To"] = SMTP_CONFIG["from_email"]

                    msg.attach(MIMEText(plain_body, "plain", "utf-8"))
                    if html:
                        msg.attach(MIMEText(html, "html", "utf-8"))

                    success = False
                    for attempt in range(2):
                        try:
                            s.sendmail(SMTP_CONFIG["from_email"], [recipient], msg.as_string())
                            sent_count += 1
                            success = True
                            break
                        except Exception as rec_err:
                            err_str = str(rec_err)
                            # If rate limited (550) or blocked, wait 3 seconds and retry with clean plain-text fallback
                            if attempt == 0 and ("550" in err_str or "suspicious" in err_str.lower()):
                                time.sleep(3.0)
                                try:
                                    s.rset()
                                except Exception:
                                    pass
                                try:
                                    fallback_msg = (
                                        f"From: {SMTP_CONFIG['sender_name']} <{SMTP_CONFIG['from_email']}>\r\n"
                                        f"To: {recipient}\r\n"
                                        f"Subject: {subject}\r\n"
                                        f"Content-Type: text/plain; charset=utf-8\r\n\r\n"
                                        f"{plain_body}"
                                    )
                                    s.sendmail(SMTP_CONFIG["from_email"], [recipient], fallback_msg.encode("utf-8"))
                                    sent_count += 1
                                    success = True
                                    break
                                except Exception as fb_err:
                                    pass
                            if attempt == 1:
                                errors.append(f"{recipient}: {rec_err}")

            if sent_count > 0:
                self._send_json(200, {"success": True, "message": f"Email sent successfully to {sent_count} recipients", "recipients": valid_recipients, "errors": errors})
            else:
                self._send_json(500, {"success": False, "error": "; ".join(errors) or "Failed to send to any recipient"})
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
