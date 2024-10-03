import { Link } from 'react-router-dom';
import mainLogo from "../img/Board-buddies-logo.png";
import { AuthContext } from "../components/AuthProvider";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";


function Nav() {
    const { signout, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const goBack = (e) => {
        e.preventDefault();
        navigate(-1);
    };


    useEffect(() => {
        console.log('Current user:', user);
    }, [user]);


    function handleSignout() {
        signout();
        navigate("/");
    }

    
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{ backgroundColor: 'rgba(30, 30, 30, 0.5)', color: 'white' }}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img
                            src={mainLogo}
                            alt="Board Buddies Logo"
                        />
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className='nav-item'>
                                <Link className='nav-link' to="#" onClick={goBack}>Back</Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link'to="/dashboard">Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" onClick={handleSignout} to="/signin">Signout</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Nav;
