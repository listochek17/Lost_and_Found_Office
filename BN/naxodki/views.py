from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse, HttpResponseNotFound
from django.contrib import messages
from django.contrib.auth.hashers import check_password

from .forms import CardForm, ClientForm
from .models import Card, Client

log_data = {
    'title':'Вход',
    'email':'Email',
    'login':'Войти',
    'password':'Пароль',
    'forgot':'Забыли пароль?',
    'remember':'Запомнить пароль',
    'dont_have':'Нет аккаунта?',
    'register':'Зарегестрироваться'
}
register_data = {
    'title':'Регистрация',
    'email':'Email',
    'login':'Войти',
    'password':'Пароль',
    'ver_pas':'Повторите пароль',
    'name':'ФИО',
    'have':'Есть аккаунт?',
    'register':'Зарегестрироваться',
    'tel':'Номер телефона'

}
ver_data = {
    'title':'Проверка',
    'return':'Вернуться',
    'kod':'Код подтверждения',
    'sms':'Введите код из смс',
    'resend':'Отправить код заново',
    'verify':'Подтвердить',
    'check':'Подтверждение'
}
category_data = [
    {'icon':'','cat_name':'Все категории','id':0},
    {'icon':'fas fa-mobile-alt','cat_name':'Телефоны','id':1},
    {'icon':'fas fa-briefcase','cat_name':'Документы','id':2},
    {'icon':'fas fa-paw','cat_name':'Животные','id':3},
    {'icon':'fas fa-key','cat_name':'Ключи','id':4},
    {'icon':'fas fa-tshirt','cat_name':'Одежда','id':5},
    {'icon':'fas fa-laptop','cat_name':'Электроника','id':6},
    {'icon':'fas fa-bicycle','cat_name':'Транспорт','id':7}
]

types_data = [
    {'type':'Все категории', 'class':'all'},
    {'type':'Найденое', 'class':'found'},
    {'type':'Потереное', 'class':'lost'}
]




def index(request):
    items = Card.objects.all()
    data = {'id': 0,
            'cls':'all',
            'title':'Бюро находок',
            'items':items,
            }

    return render(request, 'naxodki/main.html', context=data)

def code404(request, exception):
    return HttpResponseNotFound('<h1>Страница не найдена</h1><h2>Code 404</h2>')

def rec_main(request):
    return render(request, 'naxodki/rec_main.html')

def log_in(request):
    return render(request, 'naxodki/log-in.html')

def reg(request):
    return render(request, 'naxodki/registration.html')

def about(request):
    return render(request, 'naxodki/about.html')

def contact(request):
    return HttpResponse('FAQ')

def verification(request):
    return render(request, 'naxodki/verification.html')

def category(request, cat_id, cls):
    items = Card.objects.all()

    if cat_id != 0:
        items = items.filter(category_id=cat_id)

    if cls != 'all':
        items = items.filter(item_type=cls)

    data = {
        'id': cat_id,
        'cls': cls,
        'items': items,
        'title': 'По категории'
    }

    return render(request, 'naxodki/main.html', data)

def card_view(request, card_slug):
    post = get_object_or_404(Card, slug=card_slug)
    data = {
        'title': post.title,
        'post': post,

    }

    return render(request, 'naxodki/card-view.html', data)

def card_create(request):
    client_id = request.session.get('client_id')
    if not client_id:
        messages.error(request, 'Необходимо войти в систему для создания объявления.')
        return redirect('login_client')
    
    if request.method == 'POST':
        form = CardForm(request.POST, request.FILES)
        if form.is_valid():
            card = form.save(commit=False)
            card.author_id = client_id
            card.save()
            messages.success(request, 'Объявление успешно создано.')
            return redirect('main')
    else:
        form = CardForm()
    
    return render(request, 'naxodki/upload-card.html', {'form': form})

def client_list(request):
    clients = Client.objects.all()
    return render(request, 'naxodki/client_list.html', {'clients': clients})

def client_detail(request, client_id):
    client = get_object_or_404(Client, id=client_id)
    return render(request, 'naxodki/client_detail.html', {'client': client})

def create_client(request):
    if request.method == 'POST':
        form = ClientForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Клиент успешно создан.')
            return redirect('client_list')
    else:
        form = ClientForm()
    return render(request, 'naxodki/client_form.html', {'form': form, 'action': 'Создать клиента'})

def update_client(request, client_id):
    client = get_object_or_404(Client, id=client_id)
    if request.method == 'POST':
        form = ClientForm(request.POST, instance=client)
        if form.is_valid():
            form.save()
            messages.success(request, 'Клиент успешно обновлен.')
            return redirect('client_detail', client_id=client.id)
    else:
        form = ClientForm(instance=client)
    return render(request, 'naxodki/client_form.html', {'form': form, 'action': 'Обновить клиента'})

def delete_client(request, client_id):
    client = get_object_or_404(Client, id=client_id)
    if request.method == 'POST':
        client.delete()
        messages.success(request, 'Клиент успешно удален.')
        return redirect('client_list')
    return render(request, 'naxodki/client_detail.html', {'client': client, 'delete_confirm': True})

def login_client(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        try:
            client = Client.objects.get(email=email)
            if check_password(password, client.password):
                request.session['client_id'] = client.id
                messages.success(request, 'Вы успешно вошли в систему.')
                return redirect('main')
            else:
                messages.error(request, 'Неверный пароль.')
        except Client.DoesNotExist:
            messages.error(request, 'Клиент с таким email не найден.')
    return render(request, 'naxodki/log-in.html', log_data)
