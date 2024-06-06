from django.db import models

class Eval(models.Model):
    user_id = models.IntegerField()
    user_email = models.EmailField()
    nombre_emp=models.CharField(max_length=100)
    rut_emp=models.CharField(max_length=50)
    sup_email= models.EmailField()
    nombre_sup=models.CharField(max_length=100)
    rut_sup=models.CharField(max_length=100)
    profesor=models.CharField(max_length=100)
    resumen = models.CharField(max_length=100)
    fecha_ini=models.DateTimeField()
    fecha_ter=models.DateTimeField()
    estado = models.CharField(max_length=20)  # Terminado o Pendiente
    evaluacion1 = models.CharField(max_length=1000)
    nota1= models.DecimalField(max_digits=3,decimal_places=2)
    evaluacion2 = models.CharField(max_length=1000)
    nota2= models.DecimalField(max_digits=3,decimal_places=2)
    evaluacion3 = models.CharField(max_length=1000)
    nota3= models.DecimalField(max_digits=3,decimal_places=2)
    paso=models.IntegerField()

