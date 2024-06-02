from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import CompanyViewSet, FundViewSet, LpViewSet, FundraiseViewSet, \
    InvestmentViewSet, AgreementViewSet, FinancialDocViewSet, ReportDocViewSet, DocumentViewSet, \
    get_companies_paginated, get_documents_paginated, respond, \
    FinancialStatementList, FinancialStatementDetail
from rest_framework.decorators import api_view

router = DefaultRouter()
router.register(r'companies', CompanyViewSet)
router.register(r'funds', FundViewSet)
router.register(r'lps', LpViewSet)
router.register(r'fundraises', FundraiseViewSet)
router.register(r'investments', InvestmentViewSet)
router.register(r'agreements', AgreementViewSet)
router.register(r'financialdocs', FinancialDocViewSet)
router.register(r'reportdocs', ReportDocViewSet)
router.register(r'documents', DocumentViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('companiesp/', get_companies_paginated, name='companiesp/'),
    path('documentsp/', get_documents_paginated, name='documentsp/'),
    path('respond/', respond, name='respond/'),
    path('financial_statements/', FinancialStatementList.as_view(), name='financial-statement-list'),
    path('financial_statements/<str:pk>/', FinancialStatementDetail.as_view(), name='financial-statement-detail')
]