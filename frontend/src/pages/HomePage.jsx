import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Container from '@mui/material/Container'

export default function HomePage() {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {/* Секция ближайшего турнира */}
            <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h4" component="h2">Ближайший турнир</Typography>
                    <Button component={RouterLink} to="/tournaments" variant="outlined">Все турниры</Button>
                </Box>
                <Card sx={{ display: 'flex', bgcolor: 'background.paper' }}>
                    <CardMedia component="div" sx={{ width: 250, height: 200, bgcolor: 'grey.700' }} />
                    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                        <CardContent>
                            <Typography variant="subtitle2" color="text.secondary">Dota 2</Typography>
                            <Typography variant="h5">Season 4 Champion Cup</Typography>
                            <Typography variant="body2" color="text.secondary">Сбор команд</Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                            <Button component={RouterLink} to="/tournaments/1" variant="contained">Подробнее</Button>
                        </CardActions>
                    </Box>
                </Card>
            </Box>

            {/* Секция матчей */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" gutterBottom>Ближайшие матчи</Typography>
                <Grid container spacing={2}>
                    {[1, 2, 3].map((i) => (
                        <Grid item xs={12} sm={6} key={i}>
                            <Card sx={{ bgcolor: 'background.paper' }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                        <Typography variant="body2" color="text.secondary">12:02</Typography>
                                        <Typography variant="body2" color="text.secondary">Dota 2</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Typography variant="h6">СибГУТИ - 1</Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Box sx={{ width: 32, height: 32, bgcolor: 'common.white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'text.primary', fontWeight: 'bold', mr: 1 }}>14</Box>
                                            <Typography variant="body1" sx={{ mx: 1 }}>:</Typography>
                                            <Box sx={{ width: 32, height: 32, bgcolor: 'common.white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'text.primary', fontWeight: 'bold' }}>12</Box>
                                        </Box>
                                        <Typography variant="h6">СибГУТИ - 2</Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Секция новостей */}
            <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h4">Новости</Typography>
                    <Button component={RouterLink} to="/news" variant="outlined">Все новости</Button>
                </Box>
                <Grid container spacing={2}>
                    {[1, 2, 3].map((i) => (
                        <Grid item xs={12} sm={6} md={4} key={i}>
                            <Card sx={{ bgcolor: 'background.paper' }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>Все победители Кубка Памяти!</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Друзья, киберспортсмены, любители...
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Секция о клубе */}
            <Card sx={{ p: 3, bgcolor: 'background.paper' }}>
                <Typography variant="h5" gutterBottom sx={{ textTransform: 'uppercase' }}>CYBSUTIS</Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    Студенческий клуб, продвигающий компьютерный спорт в стенах Сибирского Государственного Университета Телекоммуникаций и Информатики и за его пределами.
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <Button component="a" href="https://vk.com" target="_blank" rel="noopener noreferrer" variant="contained" color="primary">VK</Button>
                    <Button variant="contained" color="secondary">Стать участником</Button>
                </Box>
            </Card>
        </Container>
    )
}
