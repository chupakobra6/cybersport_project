from django.contrib.auth.models import User, AbstractUser
from django.db import models

from backend import settings


class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class CustomUser(AbstractUser):
    nickname = models.CharField(max_length=50, unique=True, verbose_name='Ник')
    about = models.TextField(blank=True, null=True, verbose_name='О себе')
    notifications_enabled = models.BooleanField(default=True, verbose_name='Уведомления включены')

    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Создан')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Обновлён')

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'

    def __str__(self):
        return self.nickname


class Team(BaseModel):
    name = models.CharField(max_length=50, unique=True)
    cover = models.ImageField(upload_to='team_cover/', blank=True, null=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, related_name='teams', null=True)

    def __str__(self):
        return self.name


class TeamMember(BaseModel):
    ROLE_CHOICES = (
        ('captain', 'Капитан'),
        ('player', 'Игрок'),
        ('substitute', 'Запасной'),
    )

    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='members')
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='team_members')
    role = models.CharField(max_length=50, choices=ROLE_CHOICES, default='player')

    class Meta:
        unique_together = ('team', 'user')

    def __str__(self):
        return f"{self.user.username} - ({self.get_role_display()})"


class Tournament(BaseModel):
    STATUS_CHOICES = (
        ('registration', 'Сбор команд'),
        ('ongoing', 'В процессе'),
        ('finished', 'Завершён'),
    )

    name = models.CharField(max_length=200)
    game = models.CharField(max_length=50)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='registration')
    description = models.TextField(blank=True, null=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, related_name='tournaments',
                                   null=True)

    def __str__(self):
        return self.name


class Match(BaseModel):
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name='matches')
    team1 = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='matches_team1', null=True)
    team2 = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='matches_team2', null=True)
    match_time = models.DateTimeField()
    score_team1 = models.PositiveIntegerField(default=0)
    score_team2 = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.team1} vs {self.team2} - {self.tournament}"


class News(BaseModel):
    title = models.CharField(max_length=200)
    content = models.TextField()
    cover = models.ImageField(upload_to='news_cover/', blank=True, null=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, related_name='news', null=True)
    published_at = models.DateTimeField(blank=True, null=True)
    is_published = models.BooleanField(default=False)

    def __str__(self):
        return self.title
