import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../components/AuthProvider";
import Chart from 'react-google-charts';
import Nav from "../Nav";
import profileIcon from "/default/default-icon.png"
import banner from "../../img/Board-buddies-banner.png"
import './Profile.css';


export default function ProfilePage() {
    const { user } = useContext(AuthContext);
    const [player, setPlayer] = useState(null);


    useEffect(() => {
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
    }, [])


    if (!player) {
        return <p>Loading...</p>;
    }


    return (
        <>
            <Nav className="navbar" />
            <div className="card mt-5 mb-5" style={{ backgroundColor: 'rgba(47, 47, 47, 0.8)', color: 'white' }}>
                <div className="profile-page container mt-5">
                    {/* Banner */}
                    <div className="text-center">
                        <img className="img-fluid mb-4" src={banner} alt="Banner" style={{ width: 'auto', height: 'auto' }} />
                    </div>
                    {/* Pic/Username/Edit Link (Left) & Card (Right) */}
                    <div className="row">
                            {/* Left Column */}
                            <div className="col-md-2 ms-4 p-1 d-flex flex-column align-items-center text-start">
                                <Link to="/editprofile" className="edit-profile d-block">
                                    <img
                                        className="img-fluid rounded-circle mb-2 mt-1"
                                        style={{ objectFit: 'cover' }}
                                        src={player.profile_picture || profileIcon}
                                        alt=""
                                        title="Edit Profile ⚙️"
                                    />
                                </Link>
                                <h1 className="auto-font fs-3 mb-1">{user.username}</h1>
                            </div>
                            {/* Right Column */}
                            <div className="col-md-9 ms-6 ps-4 d-flex">
                                <div className="card flex-fill" style={{ backgroundColor: 'rgba(66, 66, 66, 0.6)', color: 'white' }}>
                                    <div className="card-body">
                                        <div className="row">
                                            {/* Left Column of Right Column */}
                                            <div className="col-md-6 d-flex flex-column align-items-start">
                                                <h2 className="card-title h4 mt-2 mb-2">{`${player.first_name || 'First Name'} ${player.last_name || 'Last Name'}`}</h2>
                                                <p className="card-text h6">{`${player.city || 'City'}, ${player.state || 'State'}`}</p>
                                                <p className="card-text small mt-3">{`${player.about_me || 'About Me: Add your description here. Hardcoded'}`}</p>
                                                <p className="card-text small">Birthdate: {player.birthdate || 'January 1st, 2000'}</p>
                                                <p className="card-text small">Member Since: {user.date_joined || ' HC January 1st, 2000'}</p>

                                            </div>
                                            {/* Right Column of Right Column */}
                                            <div className="col-md-6 d-flex flex-column mt-3 pe-4 pt-4">
                                                    <span className="badge mb-2" style={{ backgroundColor: '#0575f5', color: 'white' }}>☑️ Verified Player</span>
                                                    <span className="badge mb-2" style={{ backgroundColor: '#14852a', color: 'white' }}>👍 Approved Play Tester</span>
                                                    <span className="badge mb-2" style={{ backgroundColor: '#f07635', color: 'white' }}>🤝 Trusted Game Host</span>
                                                    <span className="badge mb-2" style={{ backgroundColor: '#835df0', color: 'white' }}>👑 Game Developer</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                </div>

                    {/* Preferences Section */}
                    <div className="preferences mt-5">
                        <h3>Preferences</h3>
                        {/* {player.tags && player.tags.length > 0 ? (
                            player.tags.map((tag, index) => (
                            <button
                                key={index}
                                className="btn button-primary m-1"
                                style={{
                                backgroundColor: 'rgba(30, 30, 30, 0.7)',
                                color: 'white'
                                }}
                            >
                                {tag}
                            </button>
                            ))
                        ) : (
                            <p>No preferences selected</p>
                        )} */}
                        <button
                            className="btn button-primary m-1"
                            style={{
                                backgroundColor: 'rgba(30, 30, 30, 0.7)',
                                color: 'white'
                            }}>
                            {player.playFrequency || 'Frequency'} HC Monthly
                        </button>
                        <button
                            className="btn button-primary m-1"
                            style={{
                                backgroundColor: 'rgba(30, 30, 30, 0.7)',
                                color: 'white'
                            }}>
                            {player.groupSize || 'Group Size'} HC Larger Groups
                        </button>
                        <div>
                            <button
                                className="btn button-primary m-1"
                                style={{
                                    backgroundColor: 'rgba(30, 30, 30, 0.7)',
                                    color: 'white'
                                }}>
                                {player.tags || 'Tags'}
                            </button>
                        </div>
                    </div>

                    {/* Pie Charts */}
                    <div className="charts">
                        <div className="row justify-content-center">
                            {/* Gaming Preference Stats */}
                            <div className="game-preference-chart col-md-6 p-1 d-flex flex-column align-items-center text-start">
                                <h3>Game Preference Stats</h3>
                                <Chart
                                    width={'100%'}
                                    height={'300px'}
                                    chartType="PieChart"
                                    loader={<div>Loading Chart</div>}
                                    data={[
                                        ['Type', 'Percentage'],
                                        // ['Cooperative', profile.gamePreferences.cooperative],
                                        // ['Speed', profile.gamePreferences.speed],
                                        // ['Strategy', profile.gamePreferences.strategy],
                                        // ['Cards', profile.gamePreferences.cards],
                                    ]}
                                    options={{ is3D: true }}
                                />
                            </div>
                            {/* Gaming Style */}
                            <div className="chart-container col-md-6 p-1 d-flex flex-column align-items-center text-start">
                                <h3>Gaming Style</h3>
                                <Chart
                                    width={'100%'}
                                    height={'300px'}
                                    chartType="PieChart"
                                    loader={<div>Loading Chart</div>}
                                    data={[
                                        ['Type', 'Percentage'],
                                        // ['Speedy', profile.gamingStyle.speedy],
                                        // ['Competitive', profile.gamingStyle.competitive],
                                        // ['Relaxed', profile.gamingStyle.relaxed],
                                        // ['Cooperative', profile.gamingStyle.cooperative],
                                    ]}
                                    options={{ is3D: true }}
                                />
                            </div>

                        </div>
                    </div>

                    {/* Cards Section */}
                        <div className="row justify-content-center">
                            {/* Games Played */}
                            <div className="games-played card col-md-5 me-3 p-3 d-flex flex-column align-items-center text-start" style={{ backgroundColor: 'rgba(66, 66, 66, 0.6)', color: 'white' }}>
                                <h3>Games I Play</h3>
                                <ul>
                                    <li>Hardcoded List</li>
                                    <li>Settlers of Catan</li>
                                    <li>Boggle</li>
                                    <li>Apples to Apples</li>
                                    <li>Wingspan</li>
                                    <li>Monopoly</li>
                                </ul>
                            </div>
                            {/* Links */}
                                <div className="useful-links card col-md-5 p-3" style={{ backgroundColor: 'rgba(66, 66, 66, 0.6)', color: 'white' }}>
                                    <h3>Links</h3>
                                        <div className="d-flex flex-column align-items-center">
                                            <Link to="/under-construction" className="text-decoration-none mb-1">About Us</Link>
                                            <Link to="/under-construction" className="text-decoration-none mb-1">Contact</Link>
                                            <Link to="/under-construction" className="text-decoration-none mb-1">Settings</Link>
                                            <Link to="/under-construction" className="text-decoration-none mb-1">Preferences Quiz</Link>
                                            <Link to="/under-construction" className="text-decoration-none mb-1">Becoming a Playtester</Link>
                                            <Link to="/under-construction" className="text-decoration-none mb-1">Becoming a Game Host</Link>
                                        </div>
                                </div>
                        </div>
                </div>
            </div>
        </>
    )
}
