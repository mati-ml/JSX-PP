from django.db import models
from users.models import User

class Eval(models.Model):
    user_id = models.IntegerField()
    user_email = models.EmailField()
    user_role= models.CharField(max_length=50, null=True, blank=True)
    estado = models.CharField(max_length=20,default='Pendiente') 
    reunion=models.CharField(max_length=11, default='Pendiente')
    # Nuevas columnas
    fecha_ini = models.DateField(null=True, blank=True)
    fecha_ter = models.DateField(null=True, blank=True)
    nombre_emp = models.CharField(max_length=100, null=True, blank=True)
    rut_emp = models.CharField(max_length=50, null=True, blank=True)
    sup_email = models.EmailField(null=True, blank=True)
    nombre_sup = models.CharField(max_length=100, null=True, blank=True)
    rut_sup = models.CharField(max_length=100, null=True, blank=True)
    profesor = models.CharField(max_length=100, null=True, blank=True)
    resumen = models.CharField(max_length=100, null=True, blank=True)
    evaluacion1 = models.CharField(max_length=1000, null=True, blank=True)
    nota1 = models.DecimalField(max_digits=3, decimal_places=2, null=True, blank=True)
    evaluacion2 = models.CharField(max_length=1000, null=True, blank=True)
    nota2 = models.DecimalField(max_digits=3, decimal_places=2, null=True, blank=True)
    evaluacion3 = models.CharField(max_length=1000, null=True, blank=True)
    nota3 = models.DecimalField(max_digits=3, decimal_places=2, null=True, blank=True)
    paso = models.IntegerField(null=True, blank=True,default=0)
    comentarioemp= models.CharField(max_length=1000)
    notaemp= models.DecimalField(max_digits=3, decimal_places=2,null=True, blank=True)
    estadosup= models.CharField(max_length=10, default='Pendiente')
    rubrica1= models.CharField(max_length=100, null=True, blank=True)
    rubrica2=models.CharField(max_length=100, null=True, blank=True)
    rubrica3=models.CharField(max_length=100, null=True, blank=True)
    notapemp= models.DecimalField(max_digits=3, decimal_places=2,default=0)
    personas=models.IntegerField(default=0)
    requisitos= models.CharField(max_length=10, default='Pendiente')
    def __str__(self):
        return f"{self.pasantia} - {self.user_email}"




