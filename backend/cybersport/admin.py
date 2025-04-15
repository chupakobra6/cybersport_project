from django.contrib import admin

from cybersport.models import CustomUser, Team, TeamMember, Tournament, Match, News


@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Личная информация', {'fields': ('nickname', 'about', 'notifications_enabled')}),
        ('Права', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Даты', {'fields': ('last_login', 'date_joined')}),
    )
    list_display = (
        'id', 'nickname', 'about', 'notifications_enabled', 'created_at', 'updated_at'
    )
    list_filter = ('is_active', 'is_staff', 'is_superuser')
    search_fields = ('username', 'nickname', 'email')
    ordering = ('-created_at', '-updated_at')


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'cover', 'created_by', 'created_at', 'updated_at')


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ('id', 'team', 'user', 'role', 'created_at', 'updated_at')


@admin.register(Tournament)
class TournamentAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'game', 'status', 'description', 'created_by', 'created_at', 'updated_at')


@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'tournament', 'team1', 'team2', 'match_time', 'score_team1', 'score_team2', 'created_at', 'updated_at')


@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'title', 'content', 'cover', 'author', 'published_at', 'is_published', 'created_at', 'updated_at')
