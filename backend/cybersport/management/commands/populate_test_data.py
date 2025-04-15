import random
from datetime import timedelta

from django.core.management import BaseCommand
from django.utils import timezone

from cybersport.models import CustomUser, Team, TeamMember, Tournament, Match, News


class Command(BaseCommand):
    help = 'Fills the database with realistic test data'

    def handle(self, *args, **options):
        self.stdout.write('Starting to populate database with test data')

        usernames = [
            ('alex_gaming', 'Alexander', 'alex.gaming@gmail.com'),
            ('pro_gamer123', 'Michael', 'michael.pro@gmail.com'),
            ('cyber_ninja', 'Nina', 'nina.cyber@gmail.com'),
            ('thunder_strike', 'Thomas', 'thomas.thunder@gmail.com'),
            ('dark_warrior', 'Daniel', 'daniel.warrior@gmail.com'),
            ('swift_blade', 'Sophie', 'sophie.swift@gmail.com'),
            ('elite_sniper', 'Erik', 'erik.elite@gmail.com'),
            ('magic_master', 'Maria', 'maria.magic@gmail.com'),
        ]

        users = []
        for username, nickname, email in usernames:
            user, created = CustomUser.objects.get_or_create(
                username=username,
                defaults={
                    'nickname': nickname,
                    'email': email,
                    'password': 'secure_password_123',
                }
            )
            users.append(user)
            if created:
                self.stdout.write(f'Created user: {user.username} ({user.nickname})')

        team_names = [
            'Neon Dragons',
            'Phantom Elite',
            'Digital Storms',
            'Quantum Raiders',
        ]

        teams = []
        for team_name in team_names:
            creator = random.choice(users)
            team, created = Team.objects.get_or_create(
                name=team_name,
                defaults={
                    'created_by': creator,
                }
            )
            teams.append(team)
            if created:
                self.stdout.write(f'Created team: {team.name}')

        for team in teams:
            available_users = list(users)
            captain = random.choice(available_users)
            available_users.remove(captain)
            TeamMember.objects.get_or_create(
                team=team,
                user=captain,
                defaults={'role': 'captain'}
            )
            
            for _ in range(3):
                player = random.choice(available_users)
                available_users.remove(player)
                TeamMember.objects.get_or_create(
                    team=team,
                    user=player,
                    defaults={'role': 'player'}
                )
            
            if available_users:
                substitute = random.choice(available_users)
                TeamMember.objects.get_or_create(
                    team=team,
                    user=substitute,
                    defaults={'role': 'substitute'}
                )

        tournament_data = [
            ('CyberMasters 2024', 'CS:GO', 'Prestigious annual tournament with top teams', 10000),
            ('Elite League Season 5', 'Dota 2', 'Professional league with weekly matches', 15000),
            ('Rapid Gaming Cup', 'Valorant', 'Fast-paced tournament for emerging teams', 5000),
        ]

        tournaments = []
        for name, game, description, prize_pool in tournament_data:
            creator = random.choice(users)
            tournament, created = Tournament.objects.get_or_create(
                name=name,
                defaults={
                    'game': game,
                    'status': random.choice(['registration', 'ongoing']),
                    'description': description,
                    'prize_pool': prize_pool,
                    'created_by': creator,
                }
            )
            tournaments.append(tournament)
            if created:
                self.stdout.write(f'Created tournament: {tournament.name}')

        for tournament in tournaments:
            if len(teams) >= 2:
                for _ in range(3):
                    team1, team2 = random.sample(teams, 2)
                    match_time = timezone.now() + timedelta(days=random.randint(1, 14))
                    
                    if tournament.game == 'CS:GO':
                        score1, score2 = random.randint(10, 16), random.randint(5, 14)
                    elif tournament.game == 'Dota 2':
                        score1, score2 = random.randint(20, 45), random.randint(15, 40)
                    else:  # Valorant
                        score1, score2 = random.randint(8, 13), random.randint(5, 11)
                    
                    match, created = Match.objects.get_or_create(
                        tournament=tournament,
                        team1=team1,
                        team2=team2,
                        defaults={
                            'match_time': match_time,
                            'score_team1': score1,
                            'score_team2': score2,
                        }
                    )
                    if created:
                        self.stdout.write(f'Created match: {team1.name} vs {team2.name} in {tournament.name}')

        news_data = [
            ('Анонс турнира CyberMasters 2024', 
             'Рады объявить о старте самого престижного турнира года с призовым фондом $10,000. ' 
             'Лучшие команды со всего мира примут участие в борьбе за звание чемпиона.'),
            ('Phantom Elite укрепляет состав', 
             'Команда Phantom Elite объявила о подписании нового игрока. ' 
             'Это усиление должно помочь команде в предстоящем сезоне.'),
            ('Итоги Elite League Season 5', 
             'Завершился очередной сезон Elite League. Турнир показал высочайший уровень ' 
             'игры и подарил болельщикам незабываемые моменты.'),
            ('Обновление формата турниров', 
             'В следующем сезоне нас ждут изменения в формате проведения турниров. ' 
             'Новая система должна сделать соревнования еще более зрелищными.'),
        ]

        for title, content in news_data:
            author = random.choice(users)
            news, created = News.objects.get_or_create(
                title=title,
                defaults={
                    'content': content,
                    'author': author,
                    'is_published': True,
                    'published_at': timezone.now() - timedelta(days=random.randint(0, 7)),
                }
            )
            if created:
                self.stdout.write(f'Created news: {news.title}')

        self.stdout.write(self.style.SUCCESS('Database successfully populated with realistic test data'))
