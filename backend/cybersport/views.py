from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, filters

from cybersport.models import CustomUser, Team, TeamMember, Tournament, Match, News
from cybersport.serializers import CustomUserSerializer, TeamSerializer, TeamMemberSerializer, TournamentSerializer, \
    MatchSerializer, NewsSerializer


class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['username', 'nickname', 'email']
    ordering_fields = ['username', 'nickname', 'email', 'created_at', 'updated_at']


class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'created_by__username', 'created_by__nickname']
    ordering_fields = ['name', 'created_by', 'created_at', 'updated_at']


class TeamMemberViewSet(viewsets.ModelViewSet):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer

    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['team__name', 'user__username', 'user__nickname']
    ordering_fields = ['team', 'user', 'role', 'created_at', 'updated_at']


class TournamentViewSet(viewsets.ModelViewSet):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer

    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'game', 'description', 'created_by__username', 'created_by__nickname']
    ordering_fields = ['name', 'game', 'status', 'created_by', 'created_at', 'updated_at']


class MatchViewSet(viewsets.ModelViewSet):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer

    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['tournament__name', 'team1__name', 'team2__name']
    ordering_fields = ['tournament', 'team1', 'team2', 'match_time', 'score_team1', 'score_team2', 'created_at', 'updated_at']


class NewsViewSet(viewsets.ModelViewSet):
    queryset = News.objects.all()
    serializer_class = NewsSerializer

    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'content', 'author__username', 'author__nickname']
    ordering_fields = ['title', 'author', 'published_at', 'is_published', 'created_at', 'updated_at']
