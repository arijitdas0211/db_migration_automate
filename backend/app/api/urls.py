from .views import check_active_db_servers, validate_credentials
from django.urls import path

urlpatterns = [
    path('servers/activedb/', check_active_db_servers, name='check_active_db_servers'),
    path('servers/activedb/connect/', validate_credentials, name='validate_credentials'),
]

