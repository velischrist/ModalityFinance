from rest_framework import viewsets
from .models import Company, Fund, Lp, Fundraise, Investment, Agreement, FinancialDoc, ReportDoc, Document
from .serializers import CompanySerializer, FundSerializer, LpSerializer, FundraiseSerializer, InvestmentSerializer, AgreementSerializer, FinancialDocSerializer, ReportDocSerializer, DocumentSerializer, FinancialStatementSerializer
from .helperfunctions import paginate, wild_card_search
from django.views.decorators.http import require_http_methods
import json
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from openai import OpenAI
from rest_framework.parsers import MultiPartParser, FormParser
from .retrieval import retrieve_most_similar_document
from .helperfunctions import extract_text_from_pdf
from .mongodb import financial_statements
from django.shortcuts import render
from rest_framework import generics
from bson import ObjectId

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

class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    parser_classes = (MultiPartParser, FormParser)  # Add this line to enable file uploads


@api_view(['POST'])
def get_companies_paginated(request):
    try:
        body = json.loads(request.body)
        page_index = body.get('pageIndex', 1)
        page_size = body.get('pageSize', 10)
        sort = body.get('sort', {})
        query = body.get('query', '')
        order = sort.get('order', 'asc')
        key = sort.get('key', 'companyid')  # Default sorting by the 'companyid' field
        
        # Fetching the company data
        companies = list(Company.objects.all().values())

        # Filtering non-callable and non-private attributes (sanitize)
        companies = [company for company in companies if isinstance(company, dict)]

        # Sorting the data
        if key in ['companyname', 'industry', 'location'] and order:
            companies.sort(key=lambda x: x[key].upper(), reverse=(order == 'desc'))
        else:
            companies.sort(key=lambda x: int(x['companyid']), reverse=(order == 'desc'))
        
        # Searching with a wildcard - simplistic implementation
        if query:
            companies = wild_card_search(companies, query)
        
        # Paginate
        data = paginate(companies, page_size, page_index) 
        
        # Response
        response_data = {
            'data': data,
            'total': len(companies),
        }
        return JsonResponse(response_data, safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)
    

@api_view(['POST'])
def get_documents_paginated(request):
    try:
        body = json.loads(request.body)
        page_index = body.get('pageIndex', 1)
        page_size = body.get('pageSize', 10)
        sort = body.get('sort', {})
        query = body.get('query', '')
        order = sort.get('order', 'asc')
        key = sort.get('key', 'id')  # Default sorting by the 'id' field
        companyid = body.get('companyid', 0)
        
        # Fetching the company data
        documents = list(Document.objects.all().values())

        # Filtering non-callable and non-private attributes (sanitize)
        documents = [document for document in documents if isinstance(document, dict)]

        documents = [document for document in documents if document['companyid_id'] == companyid]

        # Sorting the data
        if key in ['documentname', 'type'] and order:
            documents.sort(key=lambda x: x[key].upper(), reverse=(order == 'desc'))
        else:
            documents.sort(key=lambda x: int(x['id']), reverse=(order == 'desc'))
        
        # Searching with a wildcard - simplistic implementation
        if query:
            documents = wild_card_search(documents, query)
        
        # Paginate
        data = paginate(documents, page_size, page_index) 
        
        # Response
        response_data = {
            'data': data,
            'total': len(documents),
        }
        return JsonResponse(response_data, safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)


@api_view(['POST'])
def respond(request):
    if 'message' not in request.data:
        return Response({'error': 'Invalid input'}, status=status.HTTP_400_BAD_REQUEST)

    message = request.data['message']
    document_path, _ = retrieve_most_similar_document(message)
    document_content = extract_text_from_pdf(document_path.path)
    print(document_path.path)
    client = OpenAI()

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": f"Context: {document_content} \n\n Based on the context provided above, answer the following question: {message}"}]
        )

        response_text = response.choices[0].message.content
        return Response({'response': response_text})
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# MongoDB setup
collection = financial_statements

class FinancialStatementList(generics.ListCreateAPIView):
    serializer_class = FinancialStatementSerializer

    def get_queryset(self):
        return list(collection.find())

    def perform_create(self, serializer):
        serializer.save()

class FinancialStatementDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = FinancialStatementSerializer

    def get_object(self):
        obj_id = self.kwargs["pk"]
        obj = collection.find_one({"_id": ObjectId(obj_id)})
        if obj:
            obj["_id"] = str(obj["_id"])
        return obj

    def perform_update(self, serializer):
        serializer.save()

    def perform_destroy(self, instance):
        collection.delete_one({"_id": ObjectId(self.kwargs["pk"])})
