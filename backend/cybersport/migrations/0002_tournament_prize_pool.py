# Generated by Django 5.1.7 on 2025-04-15 17:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cybersport', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='tournament',
            name='prize_pool',
            field=models.PositiveIntegerField(default=0, verbose_name='Призовой фонд'),
        ),
    ]
