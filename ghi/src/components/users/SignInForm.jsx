import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import useAuthService from '../../hooks/useAuthService'
import { NavLink } from "react-router-dom";
import Nav from "../Nav";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function SignInForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const { signin, user, error } = useAuthService()

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    async function handleFormSubmit(e) {
        e.preventDefault()
        await signin({ username, password });
    }

    if (user) {
        console.log('user', user)
        return <Navigate to="/dashboard" />;
    }

    return (
        <>
            <Nav />
            <div className="signin">
                <div className="card" style={{width:"30rem"}}>
                    <div className="mb-3">
                        <h1 className='mt-3'>Sign In</h1>
                        <form onSubmit={handleFormSubmit} id="signin-user-form">
                            <div className="form-floating m-3">
                                <div className="username-input-wrapper">
                                <input
                                    type="text"
                                    name="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter Username"
                                    className="form-control"
                                />
                                </div>
                            </div>
                            <div className="form-floating m-3">
                                <div className="password-input-wrapper">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter Password"
                                        className="form-control"
                                    />
                                    <span className='password-toggle-icon' onClick={toggleShowPassword}>
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
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
        </>
    );
  }
