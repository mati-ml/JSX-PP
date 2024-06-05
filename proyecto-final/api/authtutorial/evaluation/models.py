from django.db import models
from users .models import User


class Eval(models.Model):
    user_email = models.ForeignKey(User, on_delete=models.CASCADE, to_field='email', related_name='evaluations_by_email')
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, to_field='id', related_name='evaluations_by_id')
    pasantia = models.CharField(max_length=100)
    estado = models.CharField(max_length=20)     # Terminado o Pendiente
    evaluacion = models.CharField(max_length=5)
    comentarios = models.CharField(max_length=1000)
