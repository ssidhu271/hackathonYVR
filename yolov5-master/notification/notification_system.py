import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


class NotificationManager:
    def __init__(self):
        # Gmail SMTP settings
        self.email_host = 'smtp.gmail.com'
        self.email_port = 587
        self.email_use_tls = True
        self.email_host_user = 'yvrstaffnotifications@gmail.com'
        self.email_host_password = os.getenv('EMAIL_HOST_PASSWORD')

    def send_email(self, name, subject, message, recipient):
        try:
            subject_preface = ['DO NOT RESPOND: ', subject]
            message_body = [
                f"""Hello {name},
                
                There is cleaning required at <location>.
                Please assess the area
                """
            ]

            email_msg = MIMEMultipart()
            email_msg['From'] = self.email_host_user
            email_msg['To'] = recipient
            email_msg['Subject'] = ''.join(subject_preface)
            email_msg.attach(MIMEText(''.join(message_body), 'plain'))

            server = smtplib.SMTP(self.email_host, self.email_port)
            if self.email_use_tls:
                server.starttls()
            server.login(self.email_host_user, self.email_host_password)
            server.send_message(email_msg)
            server.quit()
            return 'Email sent successfully!'
        except Exception as e:
            return f'Failed to send email: {str(e)}'


def main():
    notif_manager = NotificationManager()

    location = None
    subject = 'DO NOT RESPOND: Cleanup Needed'

    body = """
        Hello ____,
        
        There is cleaning required at <location>.
        Please assess the area
        """
    recipient = "harrisondijon@gmail.com"

    result = notif_manager.send_email(subject, body, recipient)
    print(result)  # This will print out the result of the email sending attempt.
    # print(notif_manager.email_host_password)
    # print(os.environ)


if __name__ == '__main__':
    main()