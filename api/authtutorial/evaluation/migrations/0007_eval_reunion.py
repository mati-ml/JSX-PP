# Generated by Django 5.0.4 on 2024-06-12 02:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('evaluation', '0006_alter_eval_fecha_ini_alter_eval_fecha_ter'),
    ]

    operations = [
        migrations.AddField(
            model_name='eval',
            name='reunion',
            field=models.CharField(default='Pendiente', max_length=11),
        ),
    ]
