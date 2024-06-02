from rest_framework import serializers
from .models import Company, Fund, Lp, Fundraise, Investment, Agreement, FinancialDoc, ReportDoc, Document, FinancialStatement
from .mongodb import financial_statements

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'

class FundSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fund
        fields = '__all__'

class LpSerializer(serializers.ModelSerializer):
    total_invested = serializers.SerializerMethodField()

    class Meta:
        model = Lp
        fields = ['lpid', 'lpname', 'location', 'type', 'total_invested']  # Explicitly list all model fields plus the new field

    def get_total_invested(self, obj):
        total = Fundraise.objects.filter(lpid=obj).aggregate(
            total_invested=serializers.models.Sum('amountinvested')
        )['total_invested']
        return total if total is not None else 0

class FundraiseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fundraise
        fields = '__all__'

class InvestmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Investment
        fields = '__all__'

class AgreementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agreement
        fields = '__all__'

class FinancialDocSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinancialDoc
        fields = '__all__'

class ReportDocSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReportDoc
        fields = '__all__'

class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = '__all__'


class FinancialStatementSerializer(serializers.Serializer):
    company_name = serializers.CharField()
    report_date = serializers.DateField()
    period_end_date = serializers.DateField()
    statement_type = serializers.CharField()
    statement_reporting_period = serializers.CharField()
    number_reporting = serializers.CharField()
    data = serializers.JSONField()

    def create(self, validated_data):
        print(validated_data)
        collection = financial_statements
        result = collection.insert_one(validated_data)
        validated_data['_id'] = str(result.inserted_id)
        return validated_data

    def update(self, instance, validated_data):
        print(validated_data)
        collection = financial_statements
        collection.update_one({"_id": instance["_id"]}, {"$set": validated_data})
        validated_data['_id'] = instance["_id"]
        return validated_data

    def to_representation(self, instance):
        # Ensure that the ObjectId is converted to a string
        instance["_id"] = str(instance["_id"])
        return instance

    def to_internal_value(self, data):
        # Map incoming JSON keys to the internal representation
        internal_data = {
            'company_name': data.get('Company Name'),
            'report_date': data.get('Report Date'),
            'period_end_date': data.get('Period End Date'),
            'statement_type': data.get('Statement Type'),
            'statement_reporting_period': data.get('Statement Reporting Period'),
            'number_reporting': data.get('Number reporting'),
            'data': data.get('Data')
        }
        return internal_data