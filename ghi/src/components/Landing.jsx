import { NavLink } from "react-router-dom";
import '../App.css'
import mainLogo from "../img/Board-buddies-logo.png"

 function LandingPage() {
    return(
        <>
            <nav className="navbar navbar-expand-sm fixed-top">
                <div className="container-fluid">
                    <NavLink className="navbar-brand text-light">Board Buddies</NavLink>
                    <ul className="navbar-nav mb-2 mb-lg-2 flex-wrap">
                        <li className="nav-item">
                            <a className="nav-link text-light" href="#about">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-light" href="#how">How It Works</a>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-light" to="/signin">Sign In</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className="nav-link mt-1"
                                to="/signup"
                                style={{
                                    backgroundColor: 'rgba(20, 20, 20, 0.5)',
                                    color: 'white',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '5px',
                                    boxShadow: '2px 2px 9px 1px rgba(255, 255, 255, 0.1)'
                                }}>
                                    Create Account
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
            <main>
                <div className="background">
                    <img src={mainLogo} alt="Logo" className="mse-1" />
                    <div className="container-fluid" id="about">
                        <div className="card mb-3" style={{ backgroundColor: 'rgba(30, 30, 30, 0.9)', color: 'white' }}>
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src="https://assets3.thrillist.com/v1/image/2915405/828x610/flatten;crop;webp=auto;jpeg_quality=60.jpg"
                                     className="img-fluid rounded-start
                                     "alt="" />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">About Us</h5>
                                        <p className="card-text text-center">
                                            Board Buddies is the #1 board game matching service in the world!
                                        </p>
                                        <p className="card-text text-start">
                                            We strive to bring you the best player experience, community and events through our state of the art matching services.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid" id="how">
                        <div className="card mb-5" style={{ backgroundColor: 'rgba(30, 30, 30, 0.9)', color: 'white' }}>
                            <div className="row g-0">
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">How It Works</h5>
                                        <p>From home to having the best board game experience possible!</p>
                                        <ol>
                                            <li className="text-start">
                                                Create or sign in to your account
                                            </li>
                                            <li className="text-start">
                                                Find one of our many board games you want to play
                                            </li>
                                            <li className="text-start">
                                                Join one of many community driven meetups across the country
                                            </li>
                                            <li className="text-start">
                                                Meet up with your local Board Buddies at loved and trusted local spaces
                                            </li>
                                            <li className="text-start">
                                                Have fun!
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
