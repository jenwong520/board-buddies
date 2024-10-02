import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SignInForm from './components/users/SignInForm';
import SignUpForm from './components/users/SignUpForm';
import Profile from './components/players/Profile';
import CreateProfile from './components/players/CreateProfile';
import EditProfile from './components/players/EditProfile';
import Construct from './components/Construct';
import LandingPage from './components/Landing';
import App from './App';
import LocationForm from './components/location/LocationForm';
import LocationList from './components/location/LocationList';
import LocationDetail from './components/location/LocationDetail';
import Dashboard from './components/users/Dashboard';
import GameList from './components/games/GameList';
import GameDetail from './components/games/GameDetail';
import AuthProvider from "./components/AuthProvider";
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import 'bootstrap/dist/js/bootstrap.bundle.min';


const BASE_URL = import.meta.env.BASE_URL
if (!BASE_URL) {
    throw new Error('BASE_URL is not defined')
}

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <App />,
            children: [
                                {
                    path: '/',
                    element:<LandingPage/>
                },
                {
                    path: 'signup',
                    element: <SignUpForm />,
                },
                {
                    path: 'signin',
                    element: <SignInForm />,
                },
                {
                    path: 'profile',
                    element: (
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: 'createprofile',
                    element: (
                        <ProtectedRoute>
                            <CreateProfile />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: 'editprofile',
                    element: (
                        <ProtectedRoute>
                            <EditProfile />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: 'dashboard',
                    element: (
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: 'location',
                    element: (
                        <ProtectedRoute>
                            <LocationList />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: 'location/create',
                    element: (
                        <ProtectedRoute>
                            <LocationForm />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: 'location/:id',
                    element: (
                        <ProtectedRoute>
                            <LocationDetail />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: 'under-construction',
                    element: <Construct />,
                },
                {
                    path: 'game',
                    element: <GameList />,
                },
                {
                    path: 'game/:id',
                    element: <GameDetail />,
                },
                                {
                    path: 'signout',
                    element: <GameDetail />,
                },
            ],
        },
    ],
    {
        basename: BASE_URL,
    }
)

const rootElement = document.getElementById('root')
if (!rootElement) {
    throw new Error('root element was not found!')
}

// Log out the environment variables while you are developing and deploying
// This will help debug things
console.table(import.meta.env)

const root = ReactDOM.createRoot(rootElement)
root.render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>
)
