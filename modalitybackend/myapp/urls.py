from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import CompanyViewSet, FundViewSet, LpViewSet, FundraiseViewSet, InvestmentViewSet, AgreementViewSet, FinancialDocViewSet, ReportDocViewSet

router = DefaultRouter()
router.register(r'companies', CompanyViewSet)
router.register(r'funds', FundViewSet)
router.register(r'lps', LpViewSet)
router.register(r'fundraises', FundraiseViewSet)
router.register(r'investments', InvestmentViewSet)
router.register(r'agreements', AgreementViewSet)
router.register(r'financialdocs', FinancialDocViewSet)
router.register(r'reportdocs', ReportDocViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
