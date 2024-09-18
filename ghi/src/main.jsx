import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import SignInForm from './components/SignInForm'
import SignUpForm from './components/SignUpForm'
import Construct from './components/Construct'
import LandingPage from './components/Landing'
import App from './App'
import AuthProvider from './components/AuthProvider'
import LocationForm from './components/location/LocationForm'
import LocationList from './components/location/LocationList'
import LocationDetail from './components/location/LocationDetail'

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

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
                    path: 'signup',
                    element: <SignUpForm />,
                },
                {
                    path: 'signin',
                    element: <SignInForm />,
                },
                {
                    path: 'location',
                    element: <LocationList />
                },
                {
                    path: 'location/create',
                    element: <LocationForm />
                },
                {
                    path: 'location/:id',
                    element: <LocationDetail />
                },
                {
                    path: 'under-construction',
                    element: <Construct />,
                },
                {
                    path: '/',
                    element:<LandingPage/>
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
