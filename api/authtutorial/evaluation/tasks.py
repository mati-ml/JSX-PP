from celery import shared_task
from .utils import programar_envio

@shared_task
def enviar_correo_task(email, subject, message, year, month, day, hour, minute):
    programar_envio(email, subject, message, year, month, day, hour, minute)
