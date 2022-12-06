# -*- coding: utf-8 -*-
# Generated by Django 1.11.8 on 2018-06-23 07:59
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ledger', '0015_wallet_registration_hub_authorization'),
    ]

    operations = [
        migrations.CreateModel(
            name='BlacklistEntry',
            fields=[
                ('id', models.AutoField(auto_created=True,
                                        primary_key=True, serialize=False, verbose_name='ID')),
                ('address', models.CharField(max_length=40, unique=True)),
            ],
        ),
    ]
