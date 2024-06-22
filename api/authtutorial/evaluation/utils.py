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



# Función para programar el envío del correo en una fecha específica con formato de 12 horas
def programar_envio(email, asunto, body, year, month, day, hour, minute, am_pm):
    # Convertir hora de 12 horas a 24 horas si es necesario
    if am_pm.lower() == 'pm' and hour != 12:
        hour += 12
    elif am_pm.lower() == 'am' and hour == 12:
        hour = 0

    schedule_date = datetime(year, month, day, hour, minute)
    current_time = datetime.now()
    time_to_wait = (schedule_date - current_time).total_seconds()

    if time_to_wait > 0:
        print(f"Esperando para enviar el correo el {schedule_date.strftime('%d/%m/%Y %I:%M %p')}")
        time.sleep(time_to_wait)
        send_email(email, asunto, body)
    else:
        print("La fecha y hora especificadas ya han pasado.")

# Ejemplo de uso: Programa para enviar el correo el 24 de junio de 2024 a las 5:30 PM
programar_envio('mmullerlanas@gmail.com', 'holaaa', 'holaaaaa', 2024, 6, 24, 5, 32, 'PM')
