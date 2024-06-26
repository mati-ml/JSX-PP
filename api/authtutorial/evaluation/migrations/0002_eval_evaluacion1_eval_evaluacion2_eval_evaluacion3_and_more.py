# Generated by Django 5.0.4 on 2024-06-06 04:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('evaluation', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='eval',
            name='evaluacion1',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
        migrations.AddField(
            model_name='eval',
            name='evaluacion2',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
        migrations.AddField(
            model_name='eval',
            name='evaluacion3',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
        migrations.AddField(
            model_name='eval',
            name='fecha_ini',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='eval',
            name='fecha_ter',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='eval',
            name='nombre_emp',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='eval',
            name='nombre_sup',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='eval',
            name='nota1',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=3, null=True),
        ),
        migrations.AddField(
            model_name='eval',
            name='nota2',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=3, null=True),
        ),
        migrations.AddField(
            model_name='eval',
            name='nota3',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=3, null=True),
        ),
        migrations.AddField(
            model_name='eval',
            name='paso',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='eval',
            name='profesor',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='eval',
            name='resumen',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='eval',
            name='rut_emp',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='eval',
            name='rut_sup',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='eval',
            name='sup_email',
            field=models.EmailField(blank=True, max_length=254, null=True),
        ),
    ]
