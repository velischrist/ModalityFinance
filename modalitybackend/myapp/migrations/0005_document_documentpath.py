# Generated by Django 4.2.11 on 2024-05-08 03:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0004_remove_company_status_remove_fund_fundsize_document'),
    ]

    operations = [
        migrations.AddField(
            model_name='document',
            name='documentpath',
            field=models.FileField(db_column='DocumentPath', null=True, upload_to=''),
        ),
    ]
