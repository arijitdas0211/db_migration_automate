from .views import check_active_db_servers, validate_and_assess
from django.urls import path

urlpatterns = [
    path('servers/activedb/', check_active_db_servers, name='check_active_db_servers'),
    path('servers/activedb/connection-and-assessment/', validate_and_assess, name='validate_and_assess'),
]
