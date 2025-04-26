import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import {AuthProvider} from './contexts/AuthContext'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import TournamentsPage from './pages/TournamentsPage'
import TournamentDetailsPage from './pages/TournamentDetailsPage'
import NewsPage from './pages/NewsPage'
import TeamPage from './pages/TeamPage'
import CreateTournamentPage from './pages/CreateTournamentPage'
import CreateNewsPage from './pages/CreateNewsPage'
import RegisterPage from './pages/RegisterPage'

const PrivateRoute = ({children}) => {
    const isAuthenticated = localStorage.getItem('token');
    return isAuthenticated ? children : <Navigate to="/login"/>;
};

export default function App() {
    return (
        <AuthProvider>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/tournaments" element={<TournamentsPage/>}/>
                    <Route path="/tournaments/:id" element={<TournamentDetailsPage/>}/>
                    <Route path="/news" element={<NewsPage/>}/>
                    <Route path="/team" element={<TeamPage/>}/>

                    {/* Приватные маршруты */}
                    <Route path="/create-tournament" element={
                        <PrivateRoute>
                            <CreateTournamentPage/>
                        </PrivateRoute>
                    }/>
                    <Route path="/create-news" element={
                        <PrivateRoute>
                            <CreateNewsPage/>
                        </PrivateRoute>
                    }/>

                    <Route path="*" element={<Navigate to="/" replace/>}/>
                </Routes>
            </Layout>
        </AuthProvider>
    )
}
