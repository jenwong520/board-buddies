import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import ProtectedRoute from './components/ProtectedRoute';
import AuthProvider from "./components/AuthProvider";
import Construct from './components/Construct';
import LandingPage from './components/Landing';
import SignInForm from './components/users/SignInForm';
import SignUpForm from './components/users/SignUpForm';
import Profile from './components/players/Profile';
import CreateProfile from './components/players/CreateProfile';
import EditProfile from './components/players/EditProfile';
import Dashboard from './components/users/Dashboard';
import LocationForm from './components/location/LocationForm';
import LocationList from './components/location/LocationList';
import LocationDetail from './components/location/LocationDetail';
import GameList from './components/games/GameList';
import GameDetail from './components/games/GameDetail';
import MeetupsList from './components/meetups/MeetupsList';
import MeetupDetail from './components/meetups/MeetupDetail';
import MeetupForm from './components/meetups/MeetupForm';
import MeetupEditForm from './components/meetups/MeetupEditForm';
import MyMeetups from './components/meetups/MyMeetups'

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
                    path: 'meetup/:id',
                    element: <MeetupDetail />,
                },
                {
                    path: 'signout',
                    element: <SignInForm />,
                },
                {
                    path: 'meetup',
                    element: <MeetupsList/>
                },
                {
                    path: "meetup/create",
                    element: (
                        <ProtectedRoute>
                            <MeetupForm />
                        </ProtectedRoute>
                    )
                },
                {
                    path: "meetup/:id/edit",
                    element: (
                        <ProtectedRoute>
                            <MeetupEditForm />
                        </ProtectedRoute>
                    )
                },
                {
                    path: "mymeetups",
                    element: (
                        <ProtectedRoute>
                            <MyMeetups />
                        </ProtectedRoute>
                    )
                }
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
