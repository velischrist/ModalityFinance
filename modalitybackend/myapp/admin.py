from django.contrib import admin

# Register your models here.

from .models import Company, Lp

admin.site.register(Company)
admin.site.register(Lp)
