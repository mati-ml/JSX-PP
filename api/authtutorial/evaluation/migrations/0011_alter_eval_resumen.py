# Generated by Django 5.0.4 on 2024-06-23 19:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('evaluation', '0010_alter_eval_resumen'),
    ]

    operations = [
        migrations.AlterField(
            model_name='eval',
            name='resumen',
            field=models.FileField(blank=True, null=True, upload_to='./'),
        ),
    ]
