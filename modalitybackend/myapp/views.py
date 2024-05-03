from django.shortcuts import render
from rest_framework import viewsets
from .models import Company, Fund, Lp, Fundraise, Investment, Agreement, FinancialDoc, ReportDoc
from .serializers import CompanySerializer, FundSerializer, LpSerializer, FundraiseSerializer, InvestmentSerializer, AgreementSerializer, FinancialDocSerializer, ReportDocSerializer

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

class FundViewSet(viewsets.ModelViewSet):
    queryset = Fund.objects.all()
    serializer_class = FundSerializer

class LpViewSet(viewsets.ModelViewSet):
    queryset = Lp.objects.all()
    serializer_class = LpSerializer

class FundraiseViewSet(viewsets.ModelViewSet):
    queryset = Fundraise.objects.all()
    serializer_class = FundraiseSerializer

class InvestmentViewSet(viewsets.ModelViewSet):
    queryset = Investment.objects.all()
    serializer_class = InvestmentSerializer

class AgreementViewSet(viewsets.ModelViewSet):
    queryset = Agreement.objects.all()
    serializer_class = AgreementSerializer

class FinancialDocViewSet(viewsets.ModelViewSet):
    queryset = FinancialDoc.objects.all()
    serializer_class = FinancialDocSerializer

class ReportDocViewSet(viewsets.ModelViewSet):
    queryset = ReportDoc.objects.all()
    serializer_class = ReportDocSerializer