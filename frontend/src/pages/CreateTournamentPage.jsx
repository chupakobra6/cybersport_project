import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

export default function CreateTournamentPage() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        title: '',
        game: 'Dota 2',
        description: '',
        rules: '',
        maxTeams: 8,
        format: 'Single Elimination',
        startDate: '',
        endDate: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Создание турнира:', formData)
        // TODO: вызвать API для создания турнира
        // После успешного создания перенаправляем на страницу турниров
        navigate('/tournaments')
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Box component="form" onSubmit={handleSubmit} sx={{ bgcolor: 'background.paper', p: 4, borderRadius: 1 }}>
                <Typography variant="h5" gutterBottom>Создание турнира</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Название турнира"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                    <FormControl fullWidth>
                        <InputLabel id="game-label">Игра</InputLabel>
                        <Select
                            labelId="game-label"
                            label="Игра"
                            name="game"
                            value={formData.game}
                            onChange={handleChange}
                        >
                            <MenuItem value="Dota 2">Dota 2</MenuItem>
                            <MenuItem value="CS2">CS2</MenuItem>
                            <MenuItem value="Valorant">Valorant</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="Описание"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        fullWidth
                    />
                    <TextField
                        label="Правила"
                        name="rules"
                        value={formData.rules}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        fullWidth
                    />
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Максимум команд"
                                name="maxTeams"
                                type="number"
                                value={formData.maxTeams}
                                onChange={handleChange}
                                fullWidth
                                inputProps={{ min: 2, max: 32 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id="format-label">Формат турнира</InputLabel>
                                <Select
                                    labelId="format-label"
                                    label="Формат турнира"
                                    name="format"
                                    value={formData.format}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="Single Elimination">Single Elimination</MenuItem>
                                    <MenuItem value="Double Elimination">Double Elimination</MenuItem>
                                    <MenuItem value="Round Robin">Round Robin</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Дата начала"
                                name="startDate"
                                type="date"
                                value={formData.startDate}
                                onChange={handleChange}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Дата окончания"
                                name="endDate"
                                type="date"
                                value={formData.endDate}
                                onChange={handleChange}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                        <Button variant="outlined" onClick={() => navigate('/tournaments')}>Отмена</Button>
                        <Button type="submit" variant="contained">Создать турнир</Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    )
}
