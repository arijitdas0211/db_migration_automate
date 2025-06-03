from django.urls import path
from .views import checkActiveDbServers

urlpatterns = [
    path('checkActiveDbServers/', checkActiveDbServers, name="checkActiveDbServers"),
]

