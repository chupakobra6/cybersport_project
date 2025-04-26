import React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'

export default function TeamPage() {
    // Демонстрационные данные
    const teamMembers = [
        { 
            id: 1, 
            name: 'Иванов Иван', 
            role: 'Капитан',
            avatar: null, // URL аватара
            description: 'Студент 3 курса факультета ИВТ. Опытный игрок в Dota 2 с рейтингом 5000 MMR.'
        },
        { 
            id: 2, 
            name: 'Петров Петр', 
            role: 'Игрок',
            avatar: null, 
            description: 'Студент 2 курса факультета МТС. Специализируется на роли мид-лейнера.'
        },
        { 
            id: 3, 
            name: 'Сидоров Сидор', 
            role: 'Игрок',
            avatar: null,
            description: 'Студент 4 курса факультета ИВТ. Харри-керри, основная роль - керри.'
        },
        { 
            id: 4, 
            name: 'Андреев Андрей', 
            role: 'Игрок',
            avatar: null,
            description: 'Студент 3 курса факультета МТС. Саппорт 5 позиции.'
        },
        { 
            id: 5, 
            name: 'Алексеев Алексей', 
            role: 'Игрок',
            avatar: null,
            description: 'Студент 2 курса факультета ИВТ. Офлейнер, любит играть на инициирующих героях.'
        }
    ]

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {/* Заголовок страницы */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4">Наша команда</Typography>
                <Button variant="contained" color="primary">Вступить в команду</Button>
            </Box>

            {/* Секция команды */}
            <Card sx={{ mb: 4, bgcolor: 'background.paper' }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>СибГУТИ - 1</Typography>
                    <Grid container spacing={2}>
                        {teamMembers.map(member => (
                            <Grid item xs={12} md={6} key={member.id}>
                                <Box sx={{ display: 'flex', bgcolor: 'grey.900', p: 2, borderRadius: 1 }}>
                                    <Avatar sx={{ width: 56, height: 56, bgcolor: 'grey.700', mr: 2 }} />
                                    <Box>
                                        <Typography variant="subtitle1" fontWeight="bold">{member.name}</Typography>
                                        <Typography variant="body2" color="primary.main">{member.role}</Typography>
                                        <Typography variant="body2" color="text.secondary">{member.description}</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </CardContent>
            </Card>

            {/* Секция достижений */}
            <Card sx={{ bgcolor: 'background.paper' }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>Достижения команды</Typography>
                    <Box component="ul" sx={{ pl: 4, color: 'text.secondary', '& li': { mb: 1 } }}>
                        <li>1 место - Season 3 Champion Cup (2023)</li>
                        <li>2 место - Кубок Памяти (2023)</li>
                        <li>1 место - Winter Tournament (2022)</li>
                        <li>3 место - Межвузовский турнир СФО (2022)</li>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    )
}
