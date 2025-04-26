import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'

export default function TournamentsPage() {
    // Демонстрационные данные
    const tournaments = [
        { id: 1, title: 'Season 4 Champion Cup', game: 'Dota 2', status: 'Сбор команд' },
        { id: 2, title: 'Кубок Памяти', game: 'CS2', status: 'Регистрация закрыта' },
        { id: 3, title: 'Winter Tournament', game: 'Dota 2', status: 'Идёт' },
        { id: 4, title: 'Sprint Cup', game: 'CS2', status: 'Завершён' },
    ]

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>Турниры</Typography>
            <Grid container spacing={2}>
                {tournaments.map((t) => (
                    <Grid item xs={12} md={6} key={t.id}>
                        <Card sx={{ bgcolor: 'background.paper' }}>
                            <Box sx={{ display: 'flex' }}>
                                <CardMedia component="div" sx={{ width: 180, height: 180, bgcolor: 'grey.700' }} />
                                <Box sx={{ flex: 1, p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <CardContent sx={{ p: 0 }}>
                                        <Typography variant="subtitle2" color="text.secondary">{t.game}</Typography>
                                        <Typography variant="h6">{t.title}</Typography>
                                        <Typography variant="body2" color="text.secondary">{t.status}</Typography>
                                    </CardContent>
                                    <CardActions sx={{ justifyContent: 'flex-end', p: 0, mt: 1 }}>
                                        <Button component={RouterLink} to={`/tournaments/${t.id}`} variant="contained">Подробнее</Button>
                                    </CardActions>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
} 