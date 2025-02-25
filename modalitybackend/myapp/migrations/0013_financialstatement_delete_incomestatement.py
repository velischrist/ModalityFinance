# Generated by Django 5.0.6 on 2024-06-02 01:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0012_incomestatement'),
    ]

    operations = [
        migrations.CreateModel(
            name='FinancialStatement',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('company_name', models.CharField(max_length=255)),
                ('report_date', models.DateField()),
                ('period_end_date', models.DateField()),
                ('statement_type', models.CharField(max_length=100)),
                ('statement_reporting_period', models.CharField(max_length=50)),
                ('number_reporting', models.CharField(max_length=50)),
                ('data', models.JSONField()),
            ],
            options={
                'db_table': 'financial_statements',
                'managed': False,
            },
        ),
        migrations.DeleteModel(
            name='IncomeStatement',
        ),
    ]
