import { NavLink } from "react-router-dom";
import '../App.css'
import mainLogo from "../img/Board-buddies-logo.png"

 function LandingPage() {
    return(
        <>
            <header className="fixed-top">
                <nav className="navbar navbar-expand-sm navbar-dark bg-danger">
                    <div className="container-fluid">
                        <NavLink className="navbar-brand">Board Buddies</NavLink>
                        <ul className="navbar-nav mb-2 mb-lg-2 flex-wrap">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/under-construction">About</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/under-construction">How it Works</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/signin">Login</NavLink>
                            </li>
                            <li className="nav-item mt-2">
                                <a className="btn btn-success" to="/signup" role="button">Create Account</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
            <main>
                <div className="background container-xl">
                    <img src={mainLogo} alt="Logo" className="mse-1" />
                </div>
            </main>
        </>
    )
 }


export default LandingPage
