# Generated by Django 5.0.4 on 2024-06-23 19:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('evaluation', '0011_alter_eval_resumen'),
    ]

    operations = [
        migrations.AlterField(
            model_name='eval',
            name='resumen',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]