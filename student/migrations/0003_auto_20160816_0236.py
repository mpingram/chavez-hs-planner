# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-08-16 02:36
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('student', '0002_auto_20160816_0212'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subject',
            name='subject_id',
            field=models.IntegerField(primary_key=True, serialize=False),
        ),
    ]
