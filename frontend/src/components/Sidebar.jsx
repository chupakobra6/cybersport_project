import React from 'react'
import { NavLink } from 'react-router-dom'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import HomeIcon from '../assets/home.svg?react'
import TrophyIcon from '../assets/trophy.svg?react'
import NewsIcon from '../assets/news.svg?react'
import UsersIcon from '../assets/users.svg?react'

export default function Sidebar() {
    const links = [
        {to: '/', icon: <HomeIcon/>, label: 'Главная'},
        {to: '/tournaments', icon: <TrophyIcon/>, label: 'Турниры'},
        {to: '/news', icon: <NewsIcon/>, label: 'Новости'},
        {to: '/team', icon: <UsersIcon/>, label: 'Команда'},
    ]

    // Дополнительные ссылки для админа или авторизованных пользователей
    const additionalLinks = [
        {to: '/create-tournament', icon: <TrophyIcon/>, label: 'Добавить турнир'},
        {to: '/create-news', icon: <NewsIcon/>, label: 'Добавить новость'},
    ]

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: 32, height: 32, bgcolor: 'primary.main', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'common.white', fontWeight: 'bold' }}>
                    С
                </Box>
                <Typography variant="h6" sx={{ ml: 1 }}>СибГУТИ</Typography>
            </Box>
            <Divider />
            <List sx={{ flexGrow: 1 }}>
                {links.map(({ to, icon, label }) => (
                    <ListItem key={to} disablePadding>
                        <ListItemButton
                            component={NavLink}
                            to={to}
                            end={to === '/'}
                            sx={{ '&.active': { bgcolor: 'action.selected', borderLeft: 3, borderColor: 'primary.main', pl: 2 } }}
                        >
                            <ListItemIcon>{icon}</ListItemIcon>
                            <ListItemText primary={label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {additionalLinks.map(({ to, icon, label }) => (
                    <ListItem key={to} disablePadding>
                        <ListItemButton
                            component={NavLink}
                            to={to}
                            sx={{ '&.active': { bgcolor: 'action.selected', borderLeft: 3, borderColor: 'primary.main', pl: 2 } }}
                        >
                            <ListItemIcon>{icon}</ListItemIcon>
                            <ListItemText primary={label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Box sx={{ p: 2 }}>
                <Button variant="contained" color="primary" fullWidth>
                    Помощь
                </Button>
            </Box>
        </Box>
    )
}
