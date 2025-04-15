from rest_framework import serializers

from cybersport.models import CustomUser, Team, TeamMember, Tournament, Match, News


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at')


class TeamSerializer(serializers.ModelSerializer):
    created_by = CustomUserSerializer(read_only=True)

    class Meta:
        model = Team
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at')


class TeamMemberSerializer(serializers.ModelSerializer):
    team = TeamSerializer(read_only=True)
    user = CustomUserSerializer(read_only=True)

    class Meta:
        model = TeamMember
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at')


class TournamentSerializer(serializers.ModelSerializer):
    created_by = CustomUserSerializer(read_only=True)

    class Meta:
        model = Tournament
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at')


class MatchSerializer(serializers.ModelSerializer):
    tournament = TournamentSerializer(read_only=True)
    team1 = TeamSerializer(read_only=True)
    team2 = TeamSerializer(read_only=True)

    class Meta:
        model = Match
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at')


class NewsSerializer(serializers.ModelSerializer):
    author = CustomUserSerializer(read_only=True)

    class Meta:
        model = News
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at')
