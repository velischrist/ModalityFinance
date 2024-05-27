# Generated by Django 4.2.11 on 2024-05-26 20:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0011_document_embedding'),
    ]

    operations = [
        migrations.CreateModel(
            name='IncomeStatement',
            fields=[
                ('statement_id', models.AutoField(primary_key=True, serialize=False)),
                ('fiscal_year', models.IntegerField()),
                ('fiscal_quarter', models.IntegerField(blank=True, null=True)),
                ('reporting_currency', models.CharField(max_length=10)),
                ('total_revenue', models.DecimalField(decimal_places=2, max_digits=20)),
                ('cost_of_goods_sold', models.DecimalField(decimal_places=2, max_digits=20)),
                ('gross_profit', models.DecimalField(decimal_places=2, max_digits=20)),
                ('research_and_development_expenses', models.DecimalField(blank=True, decimal_places=2, max_digits=20, null=True)),
                ('selling_general_administrative_expenses', models.DecimalField(blank=True, decimal_places=2, max_digits=20, null=True)),
                ('depreciation_and_amortization', models.DecimalField(blank=True, decimal_places=2, max_digits=20, null=True)),
                ('other_operating_expenses', models.DecimalField(blank=True, decimal_places=2, max_digits=20, null=True)),
                ('total_operating_expenses', models.DecimalField(blank=True, decimal_places=2, max_digits=20, null=True)),
                ('operating_income', models.DecimalField(blank=True, decimal_places=2, max_digits=20, null=True)),
                ('interest_income', models.DecimalField(blank=True, decimal_places=2, max_digits=20, null=True)),
                ('interest_expense', models.DecimalField(blank=True, decimal_places=2, max_digits=20, null=True)),
                ('other_non_operating_income', models.DecimalField(blank=True, decimal_places=2, max_digits=20, null=True)),
                ('total_non_operating_income', models.DecimalField(blank=True, decimal_places=2, max_digits=20, null=True)),
                ('total_non_operating_expenses', models.DecimalField(blank=True, decimal_places=2, max_digits=20, null=True)),
                ('income_before_tax', models.DecimalField(blank=True, decimal_places=2, max_digits=20, null=True)),
                ('income_tax_expense', models.DecimalField(blank=True, decimal_places=2, max_digits=20, null=True)),
                ('net_income_from_continuing_operations', models.DecimalField(blank=True, decimal_places=2, max_digits=20, null=True)),
                ('income_from_discontinued_operations', models.DecimalField(blank=True, decimal_places=2, max_digits=20, null=True)),
                ('net_income', models.DecimalField(blank=True, decimal_places=2, max_digits=20, null=True)),
                ('earnings_per_share_basic', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('earnings_per_share_diluted', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.company')),
            ],
            options={
                'indexes': [models.Index(fields=['company', 'fiscal_year'], name='myapp_incom_company_0f4f6b_idx'), models.Index(fields=['fiscal_year'], name='myapp_incom_fiscal__8e1660_idx')],
            },
        ),
    ]
