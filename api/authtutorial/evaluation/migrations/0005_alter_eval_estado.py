# Generated by Django 5.0.4 on 2024-06-07 22:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('evaluation', '0004_eval_user_role'),
    ]

    operations = [
        migrations.AlterField(
            model_name='eval',
            name='estado',
            field=models.CharField(default='Pendiente', max_length=20),
        ),
    ]
