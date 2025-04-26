import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Link as RouterLink } from 'react-router-dom'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import SettingsIcon from '../assets/settings.svg?react'
import BellIcon from '../assets/bell.svg?react'

export default function Header() {
    const { user } = useContext(AuthContext)

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton color="inherit">
                    <SettingsIcon width={20} height={20} />
                </IconButton>
                <IconButton color="inherit">
                    <Badge color="secondary" badgeContent={0}>
                        <BellIcon width={20} height={20} />
                    </Badge>
                </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }} />

            {user ? (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32 }}>
                        {user.nickname.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography variant="body1" sx={{ ml: 1 }}>
                        {user.nickname}
                    </Typography>
                </Box>
            ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Button component={RouterLink} to="/register" color="inherit">
                        Регистрация
                    </Button>
                    <Button component={RouterLink} to="/login" variant="contained" color="primary">
                        Войти
                    </Button>
                </Box>
            )}
        </Box>
    )
}
