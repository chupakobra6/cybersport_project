import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App'
import {ThemeProvider, CssBaseline} from '@mui/material'
import {createTheme} from '@mui/material/styles'

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {main: '#90caf9'},
        secondary: {main: '#f48fb1'},
    },
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </ThemeProvider>
)
