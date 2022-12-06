# -*- coding: utf-8 -*-
# Generated by Django 1.11.8 on 2018-08-25 11:49
from __future__ import unicode_literals

from decimal import Decimal
import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contractor', '0004_auto_20180825_1135'),
    ]

    operations = [
        migrations.AddField(
            model_name='contractledgerstate',
            name='confirmed_withdrawals',
            field=models.DecimalField(decimal_places=0, default=0, max_digits=80, validators=[
                                      django.core.validators.MinValueValidator(Decimal('0'))]),
            preserve_default=False,
        ),
    ]
