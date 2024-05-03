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
