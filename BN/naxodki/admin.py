from django.contrib import admin
from .models import Card, Client

class CardAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'create_time', 'activity')
    search_fields = ('title', 'content')
    list_filter = ('activity', 'category_id')


admin.site.register(Card, CardAdmin)


class ClientAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'created_at', 'password')
    search_fields = ('name', 'email')


admin.site.register(Client, ClientAdmin)
# Register your models here.
