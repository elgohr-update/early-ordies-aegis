# -*- coding: utf-8 -*-
# Generated by Django 1.11.8 on 2018-01-08 09:40
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ledger', '0009_challenge'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='transfer',
            unique_together=set(
                [('round', 'wallet', 'nonce'), ('round', 'recipient', 'nonce')]),
        ),
    ]
