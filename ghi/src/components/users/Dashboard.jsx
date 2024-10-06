import { useEffect, useContext, useState } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { AuthContext } from "../../components/AuthProvider";
import profileIcon from "/default/default-icon.png"
import banner from "../../img/Board-buddies-banner.png"
import mainLogo from "../../img/Board-buddies-logo.png";


export default function Dashboard() {
    const { signout, user } = useContext(AuthContext);
    const [player, setPlayer] = useState(null);
    const navigate = useNavigate();
    const goBack = (e) => {
        e.preventDefault();
        navigate(-1);
    };


    useEffect(() => {
        console.log('Current user:', user);
        const fetchPlayerDetails = async () => {
            try {
                const url = `http://localhost:8000/api/players/${user.user_id}`
                const response = await fetch(url)
                if (response.ok) {
                    const data = await response.json()
                    setPlayer(data)
                } else {
                    const errorData = await response.json();
                    console.error('Failed to fetch player details:', errorData);
                    setErrorMessage(`${errorData.message}`);
                }
            } catch (error) {
                console.error('Error fetching data ', error)
            }
    }


    fetchPlayerDetails()
}, [user]);


function handleSignout() {
    signout();
    navigate("/signin");
}


if (!player) {
    return <p>Loading...</p>;
}


    return(
        <>
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
                                {/* <Link className='nav-link' to="#" onClick={goBack}>Back</Link> */}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="dashboard">
                <div
                    className="card"
                    style={{
                        backgroundColor: 'rgba(47, 47, 47, 0.7)',
                        color: 'white',
                        marginBottom: '50%',
                        width:"500px",
                        height: '800px'
                    }}>
                <img className="m-5" src={banner} alt="" />
                    <div className="dashboard-img-name">
                        <Link to="/profile" className="view-profile d-block">
                            <img
                                className="dashboard-image img-fluid rounded-circle mb-3"
                                style={{ objectFit: 'cover' }}
                                src={player?.profile_picture || profileIcon}
                                alt=""
                                title="View Profile"
                            />
                        </Link>
                        <h2 className="mb-4">{user?.username || 'Are you a hacker?...'}</h2>
                    </div>
                    <div className="">
                        <div className="nav-item">
                            <NavLink to="/game">
                                <button
                                    className="btn btn-outline-light col-6 mt-2" type="button">Games List</button>
                            </NavLink>
                        </div>
                        <div className="nav-item">
                            <NavLink to="/under-construction">
                                <button className="btn btn-outline-light col-6 mt-2" type="button">My Meetups</button>
                            </NavLink>
                        </div>
                        <div className="nav-item">
                            <NavLink to="/meetup">
                                <button className="btn btn-outline-light col-6 mt-2" type="button">Find Meetups</button>
                            </NavLink>
                        </div>
                        <div className="nav-item">
                            <NavLink to="/under-construction">
                                <button className="btn btn-outline-light col-6 mt-2" type="button">Past Meetups</button>
                            </NavLink>
                        </div>
                        <div className="nav-item">
                            <NavLink to="/under-construction">
                                <button className="btn btn-outline-light mb-3 col-6 mt-2" type="button">Board Buddies</button>
                            </NavLink>
                        </div>
                        <div className="nav-item">
                                <button className="btn btn-outline-danger mb-5 col-6 mt-2" type="button" onClick={handleSignout}>Signout</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
