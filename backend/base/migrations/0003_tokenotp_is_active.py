# Generated by Django 3.2.5 on 2023-09-18 02:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_tokenotp_is_used'),
    ]

    operations = [
        migrations.AddField(
            model_name='tokenotp',
            name='is_active',
            field=models.BooleanField(default=False),
        ),
    ]
