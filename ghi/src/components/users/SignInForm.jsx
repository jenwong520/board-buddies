import { useState, useEffect } from 'react'
import { useNavigate, NavLink, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import useAuthService from '../../hooks/useAuthService'
import mainLogo from "../../img/Board-buddies-logo.png";

export default function SignInForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const { signin, user, error } = useAuthService()
    const navigate = useNavigate();

    const goBack = (e) => {
        e.preventDefault();
        navigate(-1);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    async function handleFormSubmit(e) {
        e.preventDefault()
        await signin({ username, password });
    }

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    return (
        <>
            <nav className="navbar navbar-expand-sm fixed-top">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">
                        <img
                            src={mainLogo}
                            alt="Board Buddies Logo"
                        />
                    </NavLink>
                    <ul className="navbar-nav mb-2 mb-lg-2 flex-wrap">
                        <li className='nav-item'>
                            <NavLink
                                className='nav-link me-4 mt-2'
                                to="#"
                                onClick={goBack}
                                style={{
                                    backgroundColor: 'rgba(20, 20, 20, 0.5)',
                                    color: 'grey', padding: '0.5rem 1rem',
                                    borderRadius: '5px',
                                    boxShadow: '2px 2px 10px 1px rgba(200, 200, 200, 0.1)'
                                }}>
                                Back
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="signin">
                <div
                    className="card"
                    style={{
                        backgroundColor: 'rgba(47, 47, 47, 0.7)',
                        color: 'white',
                        marginBottom: '120%',
                        width: '500px',
                        height: '300px'
                    }}>
                    <div className="mb-3">
                        <h1 className='m-4'>Sign In</h1>
                        <form onSubmit={handleFormSubmit} id="sign-in-form">
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
                            {error && <div className="alert alert-danger mx-3">{error.message}</div>}
                            <button
                                className="btn mb-2"
                                type="submit"
                                style={{
                                    backgroundColor: 'rgba(30, 30, 30, 0.7)',
                                    color: 'white'
                                }}>
                                    Sign In
                            </button>
                            <div>
                                <Link to="/signup" className="signup-link text-white" type="hyperlink" title="Sign Up!" >
                                    Don't have an account?
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
  }
