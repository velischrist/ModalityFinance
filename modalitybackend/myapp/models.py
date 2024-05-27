from django.db import models
from .helperfunctions import generate_vector_embedding, extract_text_from_pdf
import json


class Company(models.Model):
    companyid = models.AutoField(db_column='CompanyID', primary_key=True)  # Field name made lowercase.
    companyname = models.CharField(db_column='companyname', max_length=255)  # Field name made lowercase.
    industry = models.CharField(db_column='Industry', max_length=100, blank=True, null=True)  # Field name made lowercase.
    location = models.CharField(db_column='Location', max_length=255, blank=True, null=True)  # Field name made lowercase.
    datecreated = models.DateField(db_column='DateCreated', null=True)  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'companies'

class Fund(models.Model):
    fundid = models.AutoField(db_column='FundID', primary_key=True)  # Field name made lowercase.
    fundname = models.CharField(db_column='FundName', max_length=255)  # Field name made lowercase.
    fundtype = models.CharField(db_column='FundType', max_length=100, blank=True, null=True)  # Field name made lowercase.
    status = models.CharField(db_column='Status', max_length=6)  # Field name made lowercase.
    datecreated = models.DateField(db_column='DateCreated')  # Field name made lowercase.
    targetenddate = models.DateField(db_column='TargetEndDate', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'funds'

class Lp(models.Model):
    lpid = models.AutoField(db_column='LPID', primary_key=True)  # Field name made lowercase.
    lpname = models.CharField(db_column='LPName', max_length=255)  # Field name made lowercase.
    location = models.CharField(db_column='Location', max_length=255, blank=True, null=True)  # Field name made lowercase.
    type = models.CharField(db_column='Type', max_length=100, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'lps'


class Fundraise(models.Model):
    fundraiseid = models.AutoField(db_column='FundraiseID', primary_key=True)  # Field name made lowercase.
    lpid = models.ForeignKey(Lp, models.DO_NOTHING, db_column='LPID', blank=True, null=True)  # Field name made lowercase.
    fundid = models.ForeignKey(Fund, models.DO_NOTHING, db_column='FundID', blank=True, null=True)  # Field name made lowercase.
    amountinvested = models.BigIntegerField(db_column='AmountInvested', blank=True, null=True)  # Field name made lowercase.
    date = models.DateField(db_column='Date')  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'fundraises'


class Investment(models.Model):
    investmentid = models.AutoField(db_column='InvestmentID', primary_key=True)  # Field name made lowercase.
    companyid = models.ForeignKey(Company, models.DO_NOTHING, db_column='CompanyID', blank=True, null=True)  # Field name made lowercase.
    type = models.CharField(db_column='Type', max_length=100, blank=True, null=True)  # Field name made lowercase.
    amount = models.BigIntegerField(db_column='Amount', blank=True, null=True)  # Field name made lowercase.
    status = models.CharField(db_column='Status', max_length=11)  # Field name made lowercase.
    date = models.DateField(db_column='Date')  # Field name made lowercase.
    fundid = models.ForeignKey(Fund, models.DO_NOTHING, db_column='FundID', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'investments'

class Agreement(models.Model):
    agreementid = models.AutoField(db_column='AgreementID', primary_key=True)  # Field name made lowercase.
    companyid = models.ForeignKey(Company, models.DO_NOTHING, db_column='CompanyID', blank=True, null=True)  # Field name made lowercase.
    documentpath = models.CharField(db_column='DocumentPath', max_length=255)  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'agreements'

class FinancialDoc(models.Model):
    financialdocsid = models.AutoField(db_column='FinancialDocsID', primary_key=True)  # Field name made lowercase.
    companyid = models.ForeignKey(Company, models.DO_NOTHING, db_column='CompanyID', blank=True, null=True)  # Field name made lowercase.
    documentpath = models.CharField(db_column='DocumentPath', max_length=255)  # Field name made lowercase.
    type = models.CharField(db_column='Type', max_length=100, blank=True, null=True)  # Field name made lowercase.
    isprocessed = models.IntegerField(db_column='IsProcessed')  # Field name made lowercase.
    date = models.DateField(db_column='Date')  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'financial_docs'

class ReportDoc(models.Model):
    reportdocid = models.AutoField(db_column='ReportDocID', primary_key=True)  # Field name made lowercase.
    name = models.CharField(db_column='Name', max_length=255)  # Field name made lowercase.
    documentpath = models.CharField(db_column='DocumentPath', max_length=255)  # Field name made lowercase.
    date = models.DateField(db_column='Date')  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'report_docs'


class Document(models.Model):
    id = models.AutoField(db_column='DocumentID', primary_key=True) 
    documentname = models.CharField(db_column='DocumentName', max_length=255)
    documentpath = models.FileField(db_column='DocumentPath', null=True)
    companyid = models.ForeignKey(Company, models.DO_NOTHING, db_column='CompanyID', blank=True, null=True)
    type = models.CharField(db_column='Type', max_length=100, blank=True, null=True)  # Field name made lowercase.
    status = models.CharField(db_column='Status', max_length=100, blank=True, null=True)  # Field name made lowercase.
    uploadedAt = models.DateTimeField(db_column='DateUploaded', auto_now_add=True)  # Field name made lowercase.
    embedding = models.JSONField(db_column='Embedding', blank=True, null=True) 

    class Meta:
        managed = True
        db_table = 'documents'

    def save(self, *args, **kwargs):
        # Ensure the vector embedding is updated before saving
        super().save(*args, **kwargs)
        self.update_vector_embedding()
        super().save(update_fields=['embedding'])

    def update_vector_embedding(self):
        if self.documentpath:
            # Extract text from the PDF file
            text_content = extract_text_from_pdf(self.documentpath.path)
            embedding = generate_vector_embedding(text_content)
            self.embedding = embedding.tolist()

class IncomeStatement(models.Model):
    statement_id = models.AutoField(primary_key=True)  
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    fiscal_year = models.IntegerField()
    fiscal_quarter = models.IntegerField(null=True, blank=True)
    reporting_currency = models.CharField(max_length=10)

    total_revenue = models.DecimalField(max_digits=20, decimal_places=2)
    cost_of_goods_sold = models.DecimalField(max_digits=20, decimal_places=2)
    gross_profit = models.DecimalField(max_digits=20, decimal_places=2)

    research_and_development_expenses = models.DecimalField(max_digits=20, decimal_places=2, null=True, blank=True)
    selling_general_administrative_expenses = models.DecimalField(max_digits=20, decimal_places=2, null=True, blank=True)
    depreciation_and_amortization = models.DecimalField(max_digits=20, decimal_places=2, null=True, blank=True)
    other_operating_expenses = models.DecimalField(max_digits=20, decimal_places=2, null=True, blank=True)
    total_operating_expenses = models.DecimalField(max_digits=20, decimal_places=2, null=True, blank=True)
    operating_income = models.DecimalField(max_digits=20, decimal_places=2, null=True, blank=True)

    interest_income = models.DecimalField(max_digits=20, decimal_places=2, null=True, blank=True)
    interest_expense = models.DecimalField(max_digits=20, decimal_places=2, null=True, blank=True)
    other_non_operating_income = models.DecimalField(max_digits=20, decimal_places=2, null=True, blank=True)
    total_non_operating_income = models.DecimalField(max_digits=20, decimal_places=2, null=True, blank=True)
    total_non_operating_expenses = models.DecimalField(max_digits=20, decimal_places=2, null=True, blank=True)
    income_before_tax = models.DecimalField(max_digits=20, decimal_places=2, null=True, blank=True)

    income_tax_expense = models.DecimalField(max_digits=20, decimal_places=2, null=True, blank=True)
    net_income_from_continuing_operations = models.DecimalField(max_digits=20, decimal_places=2, null=True, blank=True)

    income_from_discontinued_operations = models.DecimalField(max_digits=20, decimal_places=2, null=True, blank=True)
    net_income = models.DecimalField(max_digits=20, decimal_places=2, null=True, blank=True)

    earnings_per_share_basic = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    earnings_per_share_diluted = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        indexes = [
            models.Index(fields=['company', 'fiscal_year']),
            models.Index(fields=['fiscal_year']),
        ]
