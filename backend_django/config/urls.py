from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('backtest/', include('backtest.urls')),
    path("admin/", admin.site.urls),
]
