from django.contrib import admin

from cybersport.models import CustomUser, Team, TeamMember, Tournament, Match, News


@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'username', 'nickname', 'email', 'is_active', 'is_staff', 'is_superuser', 'notifications_enabled', 'created_at', 'updated_at'
    )
    list_filter = ('is_active', 'is_staff', 'is_superuser', 'notifications_enabled', 'created_at', 'updated_at')
    search_fields = ('username', 'nickname', 'email')
    ordering = ('-created_at', '-updated_at')


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'cover', 'created_by', 'created_at', 'updated_at')
    list_filter = ('created_by', 'created_at', 'updated_at')
    search_fields = ('name', 'created_by__username', 'created_by__nickname')
    ordering = ('-created_at', '-updated_at')


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ('id', 'team', 'user', 'role', 'created_at', 'updated_at')
    list_filter = ('role', 'team', 'user', 'created_at', 'updated_at')
    search_fields = ('team__name', 'user__username', 'user__nickname')
    ordering = ('-created_at', '-updated_at')


@admin.register(Tournament)
class TournamentAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'game', 'status', 'description', 'created_by', 'created_at', 'updated_at')
    list_filter = ('game', 'status', 'created_by', 'created_at', 'updated_at')
    search_fields = ('name', 'game', 'description', 'created_by__username', 'created_by__nickname')
    ordering = ('-created_at', '-updated_at')


@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'tournament', 'team1', 'team2', 'match_time', 'score_team1', 'score_team2', 'created_at', 'updated_at')
    list_filter = ('tournament', 'team1', 'team2', 'match_time', 'created_at', 'updated_at')
    search_fields = ('tournament__name', 'team1__name', 'team2__name')
    ordering = ('-match_time', '-created_at')


@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'title', 'author', 'published_at', 'is_published', 'created_at', 'updated_at')
    list_filter = ('is_published', 'author', 'published_at', 'created_at', 'updated_at')
    search_fields = ('title', 'content', 'author__username', 'author__nickname')
    ordering = ('-published_at', '-created_at')
