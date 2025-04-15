from django.urls.conf import path, include
from rest_framework.routers import DefaultRouter

from cybersport.views import CustomUserViewSet, TeamViewSet, TeamMemberViewSet, TournamentViewSet, MatchViewSet, \
    NewsViewSet

router = DefaultRouter()
router.register(r'profiles', CustomUserViewSet)
router.register(r'teams', TeamViewSet)
router.register(r'team-members', TeamMemberViewSet)
router.register(r'tournaments', TournamentViewSet)
router.register(r'matches', MatchViewSet)
router.register(r'news', NewsViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
