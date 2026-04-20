from django.contrib import admin
from django.urls import path
from naxodki import views

urlpatterns = [
    path('', views.rec_main, name='rec_main'),
    path('main/', views.index, name='main'),
    path('log_in/', views.log_in, name='log_in'),
    path('registration/', views.reg, name='reg'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
    path('log_in/ver/', views.verification, name='verification'),
    path('registration/ver/', views.verification, name='verification'),
    path('category/<int:cat_id>/<str:cls>/', views.category, name='category'),
    path('card_view/<slug:card_slug>/', views.card_view, name='card_view'),
    path('card_create/', views.card_create, name='card_create'),
    path('clients/', views.client_list, name='client_list'),
    path('clients/create/', views.create_client, name='create_client'),
    path('clients/<int:client_id>/', views.client_detail, name='client_detail'),
    path('clients/<int:client_id>/update/', views.update_client, name='update_client'),
    path('clients/<int:client_id>/delete/', views.delete_client, name='delete_client'),
]
