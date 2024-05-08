from django.contrib import admin

# Register your models here.

from .models import Company, Lp, Document

admin.site.register(Company)
admin.site.register(Lp)
admin.site.register(Document)
