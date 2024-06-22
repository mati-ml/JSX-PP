import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
import time
def send_email(email,asunto,body):
    smtp_server = 'smtp.gmail.com'
    smtp_port = 587
    sender_email = 'pasantias.uai.pp@gmail.com'
    receiver_email = email
    password = 'xyws tnlo jzmp smsn'  # o tu contraseña de aplicación generada

    message = MIMEMultipart()
    message['From'] = sender_email
    message['To'] = receiver_email
    message['Subject'] = asunto
    body = body
    message.attach(MIMEText(body, 'plain'))

    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, message.as_string())
        server.quit()
        print("Correo enviado correctamente")
    except Exception as e:
        print(f"Error al enviar correo: {e}")


def programar_envio(email, asunto, body, year, month, day, hour, minute):
    schedule_date = datetime(year, month, day, hour, minute)
    current_time = datetime.now()
    time_to_wait = (schedule_date - current_time).total_seconds()

    if time_to_wait > 0:
        print(f"Esperando para enviar el correo el {schedule_date.strftime('%d/%m/%Y %H:%M')}")
        time.sleep(time_to_wait)
        send_email(email, asunto, body)
    else:
        print("La fecha y hora especificadas ya han pasado.")

