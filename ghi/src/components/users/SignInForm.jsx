import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import useAuthService from '../../hooks/useAuthService'
import { NavLink } from "react-router-dom";

export default function SignInForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { signin, user, error } = useAuthService()


    async function handleFormSubmit(e) {
        e.preventDefault()
        await signin({ username, password });
        console.log("banana", user)
    }

    if (user) {
        console.log('user', user)
        return <Navigate to="/dashboard" />;
    }


    return (
        <div className="signin">
            <div className="card" style={{width:"30rem"}}>
                <div className="mb-3">
                    <h1 className='mt-3'>Sign In</h1>
                    <form onSubmit={handleFormSubmit} id="signin-user-form">
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter Username"
                            />
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter Password"
                            />
                        </div>
                        {error && <div className="alert alert-danger">{error.message}</div>}
                        <button className="btn btn-primary mb-2" type="submit">Sign In</button>
                        <div>
                            <NavLink to="/signup" className="signup-link" type="hyperlink" title="Sign Up!" >
                                Don't have an account?
                            </NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
  }
