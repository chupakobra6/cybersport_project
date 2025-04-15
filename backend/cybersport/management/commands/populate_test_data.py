import random
from datetime import timedelta

from django.core.management import BaseCommand
from django.utils import timezone

from cybersport.models import CustomUser, Team, TeamMember, Tournament, Match, News


class Command(BaseCommand):
    help = 'Заполняет базу данных тестовыми данными для проверки отображения'

    def handle(self, *args, **options):
        self.stdout.write('Начало заполнения базы данных тестовыми данными')

        users = []
        for i in range(1, 6):
            user, created = CustomUser.objects.get_or_create(
                username=f'user{i}',
                defaults={
                    'nickname': f'User{i}',
                    'email': f'user{i}@example.com',
                    'password': f'password{i}',
                }
            )
            users.append(user)
            self.stdout.write(f'Создан пользователь: {user.username}')

        teams = []
        for i in range(1, 4):
            creator = random.choice(users)
            team, created = Team.objects.get_or_create(
                name=f'Команда {i}',
                defaults={
                    'created_by': creator,
                }
            )
            teams.append(team)
            self.stdout.write(f'Создана команда: {team.name}')

        for team in teams:
            selected_users = random.sample(users, 3)
            for user in selected_users:
                team_member, created = TeamMember.objects.get_or_create(
                    team=team,
                    user=user,
                    defaults={
                        'role': random.choice(['captain', 'player', 'substitute']),
                    }
                )
                self.stdout.write(f'Добавлен участник в команду {team.name}: {user.username}')

        tournaments = []
        for i in range(1, 3):
            creator = random.choice(users)
            tournament, created = Tournament.objects.get_or_create(
                name=f'Турнир {i}',
                defaults={
                    'game': 'Game A',
                    'status': random.choice(['registration', 'ongoing', 'finished']),
                    'description': f'Описание турнира {i}',
                    'created_by': creator,
                }
            )
            tournaments.append(tournament)
            self.stdout.write(f'Создан турнир: {tournament.name}')

        for tournament in tournaments:
            if len(teams) >= 2:
                team1, team2 = random.sample(teams, 2)
                match_time = timezone.now() + timedelta(days=random.randint(1, 10))
                match, created = Match.objects.get_or_create(
                    tournament=tournament,
                    team1=team1,
                    team2=team2,
                    defaults={
                        'match_time': match_time,
                        'score_team1': random.randint(1, 10),
                        'score_team2': random.randint(1, 10),
                    }
                )
                self.stdout.write(f'Создан матч: {team1.name} vs {team2.name} в турнире {tournament.name}')

        for i in range(1, 4):
            author = random.choice(users)
            news, created = News.objects.get_or_create(
                title=f'Новость {i}',
                defaults={
                    'content': f'Содержимое новости {i}',
                    'author': author,
                    'is_published': random.choice([True, False]),
                    'published_at': timezone.now() if random.choice([True, False]) else None,
                }
            )
            self.stdout.write(f'Создана новость: {news.title}')

        self.stdout.write(self.style.SUCCESS('База данных успешно заполнена тестовыми данными'))
