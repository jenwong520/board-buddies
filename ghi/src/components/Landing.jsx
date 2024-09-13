import { NavLink } from "react-router-dom";
import '../App.css'
import mainLogo from "../img/Board-buddies-logo.png"

 function LandingPage() {
    return(
        <>
            <nav className="navbar navbar-expand-sm navbar-info fixed-top bg-info">
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
                        <li className="nav-item">
                            <NavLink className="nav-link badge text-bg-success mt-3" to="/signup">Create Account</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
            <main>
                <div className="background container-fluid">
                    <img src={mainLogo} alt="Logo" className="mse-1" />
                    <div className="container-fluid">
                        <div className="card text-bg-dark mb-3">
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src="https://assets3.thrillist.com/v1/image/2915405/828x610/flatten;crop;webp=auto;jpeg_quality=60.jpg"
                                     className="img-fluid rounded-start
                                     "alt="" />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">About Us</h5>
                                        <p className="card-text text-start">
                                            Board Buddies is the number 1 board game matching service in the world.
                                        </p>
                                        <p className="card-text text-start">
                                            We strive to bring you the best player expirence, comunity and events through our state of the are matching sevices.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="card card text-bg-dark mb-3">
                            <div className="row g-0">
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">How it works</h5>
                                        <p>From home to having the best board game expirence possible</p>
                                        <ol>
                                            <li className="text-start">
                                                Create or sign in to your Account
                                            </li>
                                            <li className="text-start">
                                                Find one of our many board games you want to play
                                            </li>
                                            <li className="text-start">
                                                Join one of many community driven meetups across the country
                                            </li>
                                            <li className="text-start">
                                                Go to the varified location speified by the app
                                            </li>
                                            <li className="text-start">
                                                Have fun
                                            </li>
                                        </ol>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <img src="https://wordpress.wbur.org/wp-content/uploads/2023/12/Stomp-the-Plank-Blue-Green-Elephants-1000x667.jpg"
                                     className="img-fluid rounded-start
                                     "alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
 }


export default LandingPage
