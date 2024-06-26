# Generated by Django 5.0.4 on 2024-06-22 17:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('evaluation', '0007_eval_reunion'),
    ]

    operations = [
        migrations.AddField(
            model_name='eval',
            name='comentarioemp',
            field=models.CharField(default='', max_length=1000),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='eval',
            name='notaemp',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=3, null=True),
        ),
        migrations.AlterField(
            model_name='eval',
            name='paso',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
    ]
