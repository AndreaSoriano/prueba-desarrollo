# Generated by Django 3.2.5 on 2023-09-18 02:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='tokenotp',
            name='is_used',
            field=models.BooleanField(default=False),
        ),
    ]
