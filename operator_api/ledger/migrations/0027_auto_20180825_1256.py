# -*- coding: utf-8 -*-
# Generated by Django 1.11.8 on 2018-08-25 12:56
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ledger', '0026_auto_20180825_1223'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Checkpoint',
            new_name='TokenCommitment',
        ),
    ]
