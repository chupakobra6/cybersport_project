import React, { useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { Container, Box, Typography, TextField, Button, Alert, Link as MuiLink } from '@mui/material'

export default function RegisterPage() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        nickname: '',
        password: '',
        confirmPassword: ''
    })
    const [error, setError] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        // Проверка совпадения паролей
        if (formData.password !== formData.confirmPassword) {
            setError('Пароли не совпадают')
            return
        }
        
        // Здесь должен быть запрос к API для регистрации
        try {
            // Имитация успешной регистрации
            console.log('Регистрация:', formData)
            // После успешной регистрации перенаправляем на страницу входа
            navigate('/login')
        } catch (err) {
            setError('Ошибка при регистрации')
        }
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box component="form" onSubmit={handleSubmit} sx={{ bgcolor: 'background.paper', p: 4, borderRadius: 1, width: '100%' }}>
                    <Typography variant="h5" align="center" gutterBottom>Регистрация</Typography>
                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                    <TextField
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Никнейм"
                        type="text"
                        name="nickname"
                        value={formData.nickname}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Пароль"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Подтверждение пароля"
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                        Зарегистрироваться
                    </Button>
                    <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                        Уже есть аккаунт?{' '}
                        <MuiLink component={RouterLink} to="/login">
                            Войти
                        </MuiLink>
                    </Typography>
                </Box>
            </Box>
        </Container>
    )
}
