from django.db import models
from django.urls import reverse
from django.core.exceptions import ValidationError
from slugify import slugify
from django.contrib.auth.hashers import make_password

CATEGORY_CHOICES = [
    (0, 'Все категории'),
    (1, 'Телефоны'),
    (2, 'Документы'),
    (3, 'Животные'),
    (4, 'Ключи'),
    (5, 'Одежда'),
    (6, 'Электроника'),
    (7, 'Транспорт'),
]

ITEM_TYPE_CHOICES = [
    ('found', 'Найденное'),
    ('lost', 'Потеренное'),
]


class Card(models.Model):
    title = models.CharField(max_length=100, help_text='Название предмета')
    slug = models.SlugField(max_length=225, unique=True, db_index=True)
    content = models.TextField(blank=True, help_text='Описание предмета')
    author = models.CharField(max_length=100, help_text='Имя автора объявления')
    create_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)
    activity = models.BooleanField(default=True, help_text='Активно ли объявление')
    location = models.CharField(max_length=225, blank=True, help_text='Место находки/потери')
    category_id = models.PositiveSmallIntegerField(choices=CATEGORY_CHOICES, default=0)
    item_type = models.CharField(
        max_length=10,
        choices=ITEM_TYPE_CHOICES,
        default='found',
        help_text='Найдено или потеряно'
    )
    image = models.ImageField(upload_to='cards/', blank=True)
    city = models.CharField(max_length=100, blank=True, help_text='Город')

    def __str__(self):
        return f"{self.title} ({self.get_item_type_display()})"

    class Meta:
        ordering = ('-create_time',)
        indexes = [
            models.Index(fields=['category_id', '-create_time']),
            models.Index(fields=['item_type', '-create_time']),
        ]

    def get_absolute_url(self):
        return reverse('card_view', kwargs={'card_slug': self.slug})

    def clean(self):
        """Валидация модели перед сохранением"""
        if not self.title or not self.title.strip():
            raise ValidationError('Название не может быть пустым')
        if not self.author or not self.author.strip():
            raise ValidationError('Укажите ваше имя')

    def save(self, *args, **kwargs):
        """Генерирует уникальный slug если он не задан"""
        if not self.slug:
            base_slug = slugify(self.title)
            self.slug = self._generate_unique_slug(base_slug)
        
        self.full_clean()
        super().save(*args, **kwargs)

    def _generate_unique_slug(self, base_slug):
        """Генерирует уникальный slug с добавлением числового суффикса при необходимости"""
        slug = base_slug
        counter = 1
        
        # Используем .count() вместо .exists() для одного запроса
        while Card.objects.filter(slug=slug).exists():
            slug = f"{base_slug}-{counter}"
            counter += 1
        
        return slug


class Client(models.Model):
    name = models.CharField(max_length=100, help_text='Имя клиента')
    email = models.EmailField(unique=True, help_text='Email клиента')
    phone = models.CharField(max_length=20, help_text='Телефон клиента')
    password = models.CharField(max_length=128, null=True, blank=False, help_text='Пароль клиента')  # Хэшированный пароль
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.email})"

    def save(self, *args, **kwargs):
        """Хэширует пароль перед сохранением"""
        if self.password and not self.password.startswith('pbkdf2_sha256$'):  # Проверяем, не хэширован ли уже
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    class Meta:
        ordering = ('-created_at',)


# ПРИМЕЧАНИЕ: Для пользователей используйте встроенную Django модель:
# from django.contrib.auth.models import User
# Никогда не храните пароли открытым текстом!
