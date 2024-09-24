import { useState } from 'react';
import { Navigate, useNavigate, NavLink } from 'react-router-dom';
import useAuthService from '../../hooks/useAuthService';
import Nav from '../Nav';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function SignInForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { signup, user, error } = useAuthService();
    const navigate = useNavigate();

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    async function handleFormSubmit(e) {
        e.preventDefault()
        await signup({ username, password })
    }

    if (user) {
        navigate('/dashboard');
    }

    return (
        <>
            <Nav />
            <div className="signin">
                <div className="card" style={{width:"30rem"}}>
                    <div className="mb-3">
                        <h1 className='mt-3'>Create Account</h1>
                        <form onSubmit={handleFormSubmit} id="create-user-form">
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
                            <button className="btn btn-primary mb-2" type="submit">Sign Up</button>
                            <div>
                                <NavLink to="/signin" className="signin-link" type="hyperlink" title="Sign In!">
                                    Already have an account?
                                </NavLink>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
  }
