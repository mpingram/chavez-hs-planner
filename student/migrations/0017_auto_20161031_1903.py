# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-10-31 19:03
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('student', '0016_auto_20161012_1744'),
    ]

    operations = [
        migrations.CreateModel(
            name='SubjectInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subject_name', models.CharField(max_length=60)),
                ('display_name', models.CharField(max_length=60, null=True)),
                ('image', models.ImageField(upload_to='images/subj_icons', verbose_name='Subject Icon')),
            ],
        ),
        migrations.AlterField(
            model_name='grade',
            name='subject',
            field=models.CharField(max_length=60),
        ),
    ]
