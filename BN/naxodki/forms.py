from django import forms
from .models import Card, Client

class CardForm(forms.ModelForm):
    class Meta:
        model = Card
        fields = [
            'title',
            'content',
            'author',
            'city',
            'location',
            'category_id',
            'item_type',
            'image'
        ]

class ClientForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput, label='Пароль')

    class Meta:
        model = Client
        fields = ['name', 'email', 'phone', 'password']
