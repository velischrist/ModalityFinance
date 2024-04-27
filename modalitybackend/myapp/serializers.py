from rest_framework import serializers
from .models import Company, Fund, Lp, Fundraise, Investment, Agreement, FinancialDoc, ReportDoc

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'

class FundSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fund
        fields = '__all__'

class LpSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lp
        fields = '__all__'

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
