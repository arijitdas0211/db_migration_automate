from .views import check_active_db_servers, validate_and_assess, get_csrf_token
from django.urls import path

urlpatterns = [
    path("get-csrf-token/", get_csrf_token),
    path('servers/activedb/', check_active_db_servers, name='check_active_db_servers'),
    path('servers/activedb/connection-and-assessment/', validate_and_assess, name='validate_and_assess'),
]
