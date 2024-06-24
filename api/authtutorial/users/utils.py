import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
import time
from django.http import HttpResponse
import pandas as pd
from pandas.tseries.offsets import CustomBusinessMonthEnd
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
    
def respuesta():
    return HttpResponse("Alumno Aceptado")  # o el mensaje de error que desees mostrar

def ciclo_envio(fechaini, fechater, emailsup):
    try:
        print(f"ciclo_envio recibido - fechaini: {fechaini}, fechater: {fechater}, emailsup: {emailsup}")
        
        # Convertir fechas de string a datetime
        fechaini = datetime.strptime(fechaini, '%Y-%m-%d')
        fechater = datetime.strptime(fechater, '%Y-%m-%d')
        
        date_range = pd.date_range(start=fechaini, end=fechater, freq='MS')
        
        for date in date_range:
            # Encontrar el último día hábil del mes
            ultimo_dia_habil = date + CustomBusinessMonthEnd(1)
            
            # Llamar a la función para programar el envío del correo electrónico
            programar_envio(emailsup, 'Formulario de evaluación', 
                            'Haz la evaluación acá:\n https://forms.gle/ct9U4rNqJSzSebmL8',
                            int(ultimo_dia_habil.year), int(ultimo_dia_habil.month), int(ultimo_dia_habil.day),
                            8, 0)
    except Exception as e:
        print(f"Error en ciclo_envio: {e}")
        raise e