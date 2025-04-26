import React from 'react'
import { useParams } from 'react-router-dom'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export default function TournamentDetailsPage() {
    const { id } = useParams()
    
    // Демонстрационные данные
    const tournament = {
        id: 1,
        title: 'Season 4 Champion Cup',
        game: 'Dota 2',
        status: 'Сбор команд',
        description: 'Турнир Season 4 Champion Cup по Dota 2 для студентов СибГУТИ. Регистрация открыта до 20 мая. Призовой фонд 50,000 рублей.',
        rules: 'Команда состоит из 5 игроков. Все участники должны быть студентами СибГУТИ. Формат турнира - double elimination.',
        teams: [
            { id: 1, name: 'СибГУТИ - 1', members: 5, captain: 'Иванов И.И.' },
            { id: 2, name: 'СибГУТИ - 2', members: 5, captain: 'Петров П.П.' },
            { id: 3, name: 'СибГУТИ - 3', members: 4, captain: 'Сидоров С.С.' },
        ]
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Box>
                    <Typography variant="subtitle2" color="text.secondary">{tournament.game}</Typography>
                    <Typography variant="h3" component="h1">{tournament.title}</Typography>
                    <Typography variant="body1" color="primary.main">{tournament.status}</Typography>
                </Box>
                <Button variant="contained" color="primary">Зарегистрироваться</Button>
            </Box>
            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    <Card sx={{ bgcolor: 'background.paper', mb: 2 }}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>О турнире</Typography>
                            <Typography variant="body1" color="text.secondary">{tournament.description}</Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ bgcolor: 'background.paper' }}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>Правила</Typography>
                            <Typography variant="body1" color="text.secondary">{tournament.rules}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card sx={{ bgcolor: 'background.paper' }}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>Команды</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {tournament.teams.map((team) => (
                                    <Box key={team.id} sx={{ bgcolor: 'grey.900', p: 2, borderRadius: 1 }}>
                                        <Typography variant="body1" fontWeight="medium">{team.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">Участников: {team.members}/5</Typography>
                                        <Typography variant="body2" color="text.secondary">Капитан: {team.captain}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}
