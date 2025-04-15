from django.contrib.auth.models import User, AbstractUser
from django.db import models

from backend import settings


class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Дата обновления')

    class Meta:
        abstract = True
        verbose_name = 'Базовая модель'
        verbose_name_plural = 'Базовые модели'


class CustomUser(AbstractUser):
    nickname = models.CharField(max_length=50, unique=True, verbose_name='Ник')
    about = models.TextField(blank=True, null=True, verbose_name='О себе')
    notifications_enabled = models.BooleanField(default=True, verbose_name='Уведомления включены')

    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Дата обновления')

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'

    def __str__(self):
        return self.nickname


class Team(BaseModel):
    name = models.CharField(max_length=50, unique=True, verbose_name='Название команды')
    cover = models.ImageField(upload_to='team_cover/', blank=True, null=True, verbose_name='Обложка')
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, related_name='teams', null=True, verbose_name='Создатель')

    class Meta:
        verbose_name = 'Команда'
        verbose_name_plural = 'Команды'

    def __str__(self):
        return self.name


class TeamMember(BaseModel):
    ROLE_CHOICES = (
        ('captain', 'Капитан'),
        ('player', 'Игрок'),
        ('substitute', 'Запасной'),
    )

    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='members', verbose_name='Команда')
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='team_members', verbose_name='Пользователь')
    role = models.CharField(max_length=50, choices=ROLE_CHOICES, default='player', verbose_name='Роль')

    class Meta:
        unique_together = ('team', 'user')
        verbose_name = 'Участник команды'
        verbose_name_plural = 'Участники команды'

    def __str__(self):
        return f"{self.user.username} - ({self.get_role_display()})"


class Tournament(BaseModel):
    STATUS_CHOICES = (
        ('registration', 'Сбор команд'),
        ('ongoing', 'В процессе'),
        ('finished', 'Завершён'),
    )

    name = models.CharField(max_length=200, verbose_name='Название турнира')
    game = models.CharField(max_length=50, verbose_name='Игра')
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='registration', verbose_name='Статус')
    description = models.TextField(blank=True, null=True, verbose_name='Описание')
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, related_name='tournaments', null=True, verbose_name='Создатель')

    class Meta:
        verbose_name = 'Турнир'
        verbose_name_plural = 'Турниры'

    def __str__(self):
        return self.name


class Match(BaseModel):
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name='matches', verbose_name='Турнир')
    team1 = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='matches_team1', null=True, verbose_name='Команда 1')
    team2 = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='matches_team2', null=True, verbose_name='Команда 2')
    match_time = models.DateTimeField(verbose_name='Время матча')
    score_team1 = models.PositiveIntegerField(default=0, verbose_name='Счёт команды 1')
    score_team2 = models.PositiveIntegerField(default=0, verbose_name='Счёт команды 2')

    class Meta:
        verbose_name = 'Матч'
        verbose_name_plural = 'Матчи'

    def __str__(self):
        return f"{self.team1} vs {self.team2} - {self.tournament}"


class News(BaseModel):
    title = models.CharField(max_length=200, verbose_name='Заголовок')
    content = models.TextField(verbose_name='Содержание')
    cover = models.ImageField(upload_to='news_cover/', blank=True, null=True, verbose_name='Обложка')
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, related_name='news', null=True, verbose_name='Автор')
    published_at = models.DateTimeField(blank=True, null=True, verbose_name='Дата публикации')
    is_published = models.BooleanField(default=False, verbose_name='Опубликовано')

    class Meta:
        verbose_name = 'Новость'
        verbose_name_plural = 'Новости'

    def __str__(self):
        return self.title
