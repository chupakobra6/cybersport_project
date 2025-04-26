import React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'

export default function NewsPage() {
    // Демонстрационные данные
    const news = [
        { 
            id: 1, 
            title: 'Все победители Кубка Памяти!', 
            preview: 'Друзья, киберспортсмены, любители... Мы рады объявить победителей ежегодного Кубка Памяти.',
            date: '11.05.2023',
            category: 'Турниры'
        },
        { 
            id: 2, 
            title: 'Набор в киберспортивную секцию СибГУТИ', 
            preview: 'Открыт набор в киберспортивную секцию университета. Приглашаем всех желающих!',
            date: '03.05.2023',
            category: 'Анонсы'
        },
        { 
            id: 3, 
            title: 'Season 4 Champion Cup стартует 20 мая', 
            preview: 'Уже совсем скоро начнётся главное киберспортивное событие сезона в нашем университете!',
            date: '28.04.2023',
            category: 'Турниры'
        },
        { 
            id: 4, 
            title: 'Результаты Winter Tournament', 
            preview: 'Подводим итоги зимнего турнира. Поздравляем победителей и благодарим всех участников!',
            date: '15.03.2023',
            category: 'Результаты'
        },
    ]

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>Новости</Typography>
            <Stack spacing={2}>
                {news.map(item => (
                    <Card key={item.id} sx={{ bgcolor: 'background.paper' }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                <Typography variant="h6">{item.title}</Typography>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Typography variant="body2" color="text.secondary">{item.date}</Typography>
                                    <Chip label={item.category} variant="outlined" size="small" />
                                </Box>
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                {item.preview}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Читать полностью</Button>
                        </CardActions>
                    </Card>
                ))}
            </Stack>
        </Container>
    )
}
