import React, { useState, useContext } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { Container, Box, Typography, TextField, Button, Alert, Link as MuiLink } from '@mui/material'

export default function LoginPage() {
    const navigate = useNavigate()
    const { login } = useContext(AuthContext)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        
        try {
            // Здесь должен быть запрос к API для входа
            // В данном примере просто имитируем успешный вход
            console.log('Вход:', formData)
            
            // Демо-данные для успешного входа
            const userData = {
                id: 1,
                nickname: 'Пользователь',
                email: formData.email
            }
            
            // Имитация успешного входа
            await login({
                email: formData.email,
                password: formData.password
            })
            
            // После успешного входа перенаправляем на главную
            navigate('/')
        } catch (err) {
            setError('Неверный email или пароль')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box component="form" onSubmit={handleSubmit} sx={{ bgcolor: 'background.paper', p: 4, borderRadius: 1, width: '100%' }}>
                    <Typography variant="h5" align="center" gutterBottom>Вход в аккаунт</Typography>
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
                        label="Пароль"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={loading}
                        sx={{ mt: 2 }}
                    >
                        {loading ? 'Вход...' : 'Войти'}
                    </Button>
                    <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                        Нет аккаунта?{' '}
                        <MuiLink component={RouterLink} to="/register">
                            Зарегистрироваться
                        </MuiLink>
                    </Typography>
                </Box>
            </Box>
        </Container>
    )
}