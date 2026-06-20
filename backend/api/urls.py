from django.urls import path
from . import views

urlpatterns = [
    path('auth/register/', views.register, name='register'),
    path('auth/login/', views.login, name='login'),
    path('analysis/analyze/', views.analyze_code, name='analyze'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('history/', views.history, name='history'),
    path('report/<str:pk>/', views.report_detail, name='report_detail'),
]
