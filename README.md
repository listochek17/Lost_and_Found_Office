# Lost_and_Found_Office — «Бюро находок»

Веб-сайт объявлений о потерянных и найденных вещах на Django.
Пользователь регистрируется, публикует объявление с фото и находит чужие по категории и типу.

## Возможности

- Объявления с названием, описанием, городом, местом находки/потери и фотографией
- Тип объявления: **найдено** / **потеряно**
- Категории: телефоны, документы, животные, ключи, одежда, электроника, транспорт
- Фильтр ленты по категории и по типу
- Регистрация и вход клиентов (пароли хранятся в виде хэша)
- Создание объявлений только для вошедших пользователей
- Админ-панель с оформлением [Unfold](https://github.com/unfoldadmin/django-unfold)

## Стек

Python 3.12+, Django 6, SQLite, django-unfold, HTML / CSS / JavaScript.

## Запуск

```bash
git clone https://github.com/listochek17/Lost_and_Found_Office.git
cd Lost_and_Found_Office

python -m venv .venv
.venv\Scripts\activate            # Windows
# source .venv/bin/activate       # Linux / macOS

pip install -r requirements.txt

cd BN
copy .env.example .env            # Linux / macOS: cp .env.example .env
```

Откройте `.env` и задайте `SECRET_KEY`. Сгенерировать ключ:

```bash
python -c "from django.core.management.utils import get_random_secret_key as g; print(g())"
```

Затем:

```bash
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Сайт: http://127.0.0.1:8000/ · Админка: http://127.0.0.1:8000/admin/

## Структура

| Путь | Назначение |
|------|-----------|
| `BN/BN/` | настройки проекта (`settings.py`, `urls.py`) |
| `BN/naxodki/` | приложение: модели `Card` и `Client`, представления, формы, шаблоны, статика |
| `BN/manage.py` | управление проектом |

## Статус проекта

Проект учебный, в разработке.

- [x] Объявления, категории, фильтрация
- [x] Регистрация, вход, создание объявления
- [ ] Подтверждение по SMS: страница есть, но проверка кода не реализована
- [ ] Выход из аккаунта (logout)
- [ ] Страница «Контакты / FAQ»
- [ ] Автотесты

## Скриншоты

<!-- TODO: добавьте 2–3 скриншота (главная, создание объявления): ![Главная](docs/home.png) -->
