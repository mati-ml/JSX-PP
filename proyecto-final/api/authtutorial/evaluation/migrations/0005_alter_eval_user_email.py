# Generated by Django 5.0.4 on 2024-06-06 03:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('evaluation', '0004_alter_eval_user_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='eval',
            name='user_email',
            field=models.EmailField(max_length=254),
        ),
    ]
