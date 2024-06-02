from django.db import models
from .helperfunctions import generate_vector_embedding, extract_text_from_pdf
import json
from .mongodb import financial_statements
from .extract_financials import extract_financial_statements


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
        self.update_vector_embedding()
        super().save(*args, **kwargs)
        self.process_financial_document()
        super().save(update_fields=['embedding', 'status'])

    def process_financial_document(self):
        if self.documentpath:
            # Extract financial statements
            extracted_json_objects = extract_financial_statements(self.documentpath.path)

            # Save to MongoDB
            for json_obj in extracted_json_objects:
                json_obj["documentid": self.id]
                json_obj["companyid": self.companyid]
                financial_statements.insert_one(json_obj)
                print("Data saved successfully:", json_obj)

            # Mark the document as processed (optional)
            self.status = 'Processed'

    def update_vector_embedding(self):
        if self.documentpath:
            # Extract text from the PDF file
            text_content = extract_text_from_pdf(self.documentpath.path)
            embedding = generate_vector_embedding(text_content)
            self.embedding = embedding.tolist()

class FinancialStatement(models.Model):
    company_name = models.CharField(max_length=255)
    report_date = models.CharField(max_length=255)
    period_end_date = models.CharField(max_length=255)
    statement_type = models.CharField(max_length=255)
    statement_reporting_period = models.CharField(max_length=250)
    number_reporting = models.CharField(max_length=250)
    data = models.JSONField()

    class Meta:
        managed = False  # No migrations will be created for this model
        db_table = 'financial_statements'
