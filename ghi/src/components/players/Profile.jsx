import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../components/AuthProvider";
// import { tagCategories } from '../../assets/tagsData.js'     // Work in progress for tags
import { FaPlus } from 'react-icons/fa';
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

    // Mock data for Charts
    const gamePreferenceData = [
        ['Type', 'Percentage'],
        ['Dice Rolling', 25],
        ['Adventure', 20],
        ['Strategy', 15],
        ['Cards', 15],
        ['Party', 10],
        ['Speed', 10],
    ];

    const playStyleData = [
        ['Type', 'Percentage'],
        ['Speedy', 15],
        ['Time Taker', 10],
        ['Competitive', 20],
        ['Relaxed', 5],
    ];


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
                                        <div className="row align-items-center">
                                            {/* Left Column of Right Column */}
                                            <div className="col-md-6 d-flex flex-column align-items-start">
                                                <h2 className="card-title h4 mt-2 mb-2">{`${player.first_name || 'First Name'} ${player.last_name || 'Last Name'}`}</h2>
                                                <p className="card-text h6">{`${player.city || 'City'}, ${player.state || 'State'}`}</p>
                                                <p className="card-text small mt-3" style={{ textAlign: 'left' }}>{`${player.about_me || 'About Me: Add your description here. Hardcoded'}`}</p>
                                                <p className="card-text small">Birthdate: {player.birthdate || 'January 1st, 2000'}</p>
                                                <p className="card-text small">Member Since: {user.date_joined || ' HC October 1st, 2024'}</p>

                                            </div>
                                            {/* Right Column of Right Column */}
                                            <div className="col-md-6 d-flex flex-column pt-">
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

                    {/* Preferences Sections */}
                    <h1 className="display-6 mb- mt-3" style={{ color: '#f8f9fa' }}>Preferences</h1>
                    <div className="row m-1">
                        <div className="col-md-6 d-flex">
                            <div className="card shadow mb-3 flex-fill" style={{ backgroundColor: 'rgba(66, 66, 66, 0.5)' }}>
                                <h5 className="card-header" style={{ color: '#f8f9fa' }}>Frequency</h5>
                                <div className="card-body">
                                    <button
                                            className="btn button-primary m-1"
                                            style={{
                                                backgroundColor: 'rgba(30, 30, 30, 0.7)',
                                                color: 'white'
                                            }}>
                                            <FaPlus className="me-1 mb-1" />
                                            Hardcoded
                                    </button>
                                    <button
                                            className="btn button-primary m-1"
                                            style={{
                                                backgroundColor: 'rgba(30, 30, 30, 0.7)',
                                                color: 'white'
                                            }}>
                                            <FaPlus className="me-1 mb-1" />
                                            Biweekly
                                    </button>
                                    <button
                                            className="btn button-primary m-1"
                                            style={{
                                                backgroundColor: 'rgba(30, 30, 30, 0.7)',
                                                color: 'white'
                                            }}>
                                            <FaPlus className="me-1 mb-1" />
                                            Monthly
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 d-flex">
                            <div className="card shadow mb-3 flex-fill" style={{ backgroundColor: 'rgba(66, 66, 66, 0.5)' }}>
                                <h5 className="card-header" style={{ color: '#f8f9fa' }}>Group Size</h5>
                                <div className="card-body">
                                    <button
                                            className="btn button-primary m-1"
                                            style={{
                                                backgroundColor: 'rgba(30, 30, 30, 0.7)',
                                                color: 'white'
                                            }}>
                                            <FaPlus className="me-1 mb-1" />
                                            Hardcoded
                                    </button>
                                    <button
                                            className="btn button-primary m-1"
                                            style={{
                                                backgroundColor: 'rgba(30, 30, 30, 0.7)',
                                                color: 'white'
                                            }}>
                                            <FaPlus className="me-1 mb-1" />
                                            2-4 Players
                                    </button>
                                    <button
                                            className="btn button-primary m-1"
                                            style={{
                                                backgroundColor: 'rgba(30, 30, 30, 0.7)',
                                                color: 'white'
                                            }}>
                                            <FaPlus className="me-1 mb-1" />
                                            Smaller Groups
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row m-1">
                        <div className="col-md-12 d-flex">
                            <div className="card shadow mb-3 flex-fill" style={{ backgroundColor: 'rgba(66, 66, 66, 0.5)' }}>
                                <h5 className="card-header" style={{ color: '#f8f9fa' }}>Games I Play</h5>
                                <div className="card-body">
                                    <button
                                            className="btn button-primary m-1"
                                            style={{
                                                backgroundColor: 'rgba(30, 30, 30, 0.7)',
                                                color: 'white'
                                            }}>
                                            <FaPlus className="me-1 mb-1" />
                                            Hardcoded
                                    </button>
                                    <button
                                            className="btn button-primary m-1"
                                            style={{
                                                backgroundColor: 'rgba(30, 30, 30, 0.7)',
                                                color: 'white'
                                            }}>
                                            <FaPlus className="me-1 mb-1" />
                                            Catan
                                    </button>
                                    <button
                                            className="btn button-primary m-1"
                                            style={{
                                                backgroundColor: 'rgba(30, 30, 30, 0.7)',
                                                color: 'white'
                                            }}>
                                            <FaPlus className="me-1 mb-1" />
                                            Wingspan
                                    </button>
                                    <button
                                            className="btn button-primary m-1"
                                            style={{
                                                backgroundColor: 'rgba(30, 30, 30, 0.7)',
                                                color: 'white'
                                            }}>
                                            <FaPlus className="me-1 mb-1" />
                                            Codenames
                                    </button>
                                                                        <button
                                            className="btn button-primary m-1"
                                            style={{
                                                backgroundColor: 'rgba(30, 30, 30, 0.7)',
                                                color: 'white'
                                            }}>
                                            <FaPlus className="me-1 mb-1" />
                                            Ticket To Ride
                                    </button>
                                    <button
                                            className="btn button-primary m-1"
                                            style={{
                                                backgroundColor: 'rgba(30, 30, 30, 0.7)',
                                                color: 'white'
                                            }}>
                                            <FaPlus className="me-1 mb-1" />
                                            Monopoly
                                    </button>
                                    <button
                                            className="btn button-primary m-1"
                                            style={{
                                                backgroundColor: 'rgba(30, 30, 30, 0.7)',
                                                color: 'white'
                                            }}>
                                            <FaPlus className="me-1 mb-1" />
                                            Risk
                                    </button>
                                    <button
                                            className="btn button-primary m-1"
                                            style={{
                                                backgroundColor: 'rgba(30, 30, 30, 0.7)',
                                                color: 'white'
                                            }}>
                                            <FaPlus className="me-1 mb-1" />
                                            Clue
                                    </button>
                                    <button
                                            className="btn button-primary m-1"
                                            style={{
                                                backgroundColor: 'rgba(30, 30, 30, 0.7)',
                                                color: 'white'
                                            }}>
                                            <FaPlus className="me-1 mb-1" />
                                            Chess
                                    </button>
                                    <button
                                            className="btn button-primary m-1"
                                            style={{
                                                backgroundColor: 'rgba(30, 30, 30, 0.7)',
                                                color: 'white'
                                            }}>
                                            <FaPlus className="me-1 mb-1" />
                                            Everdell
                                    </button>
                                    <button
                                            className="btn button-primary m-1"
                                            style={{
                                                backgroundColor: 'rgba(30, 30, 30, 0.7)',
                                                color: 'white'
                                            }}>
                                            <FaPlus className="me-1 mb-1" />
                                            Root
                                    </button>
                                    <button
                                            className="btn button-primary m-1"
                                            style={{
                                                backgroundColor: 'rgba(30, 30, 30, 0.7)',
                                                color: 'white'
                                            }}>
                                            <FaPlus className="me-1 mb-1" />
                                            Boggle
                                    </button>
                                    <button
                                            className="btn button-primary m-1"
                                            style={{
                                                backgroundColor: 'rgba(30, 30, 30, 0.7)',
                                                color: 'white'
                                            }}>
                                            <FaPlus className="me-1 mb-1" />
                                            Magic The Gathering
                                    </button>
                                    <button
                                            className="btn button-primary m-1"
                                            style={{
                                                backgroundColor: 'rgba(30, 30, 30, 0.7)',
                                                color: 'white'
                                            }}>
                                            <FaPlus className="me-1 mb-1" />
                                            Dungeons & Dragons
                                    </button>
                                    <button
                                            className="btn button-primary m-1"
                                            style={{
                                                backgroundColor: 'rgba(30, 30, 30, 0.7)',
                                                color: 'white'
                                            }}>
                                            <FaPlus className="me-1 mb-1" />
                                            Azul
                                    </button>
                                                                        <button
                                            className="btn button-primary m-1"
                                            style={{
                                                backgroundColor: 'rgba(30, 30, 30, 0.7)',
                                                color: 'white'
                                            }}>
                                            <FaPlus className="me-1 mb-1" />
                                            Pandemic
                                    </button>
                                    <button
                                            className="btn button-primary m-1"
                                            style={{
                                                backgroundColor: 'rgba(30, 30, 30, 0.7)',
                                                color: 'white'
                                            }}>
                                            <FaPlus className="me-1 mb-1" />
                                            King of Tokyo
                                    </button>
                                    <button
                                            className="btn button-primary m-1"
                                            style={{
                                                backgroundColor: 'rgba(30, 30, 30, 0.7)',
                                                color: 'white'
                                            }}>
                                            <FaPlus className="me-1 mb-1" />
                                            7 Wonders
                                    </button>
                                    <button
                                            className="btn button-primary m-1"
                                            style={{
                                                backgroundColor: 'rgba(30, 30, 30, 0.7)',
                                                color: 'white'
                                            }}>
                                            <FaPlus className="me-1 mb-1" />
                                            Scythe
                                    </button>
                                    <button
                                            className="btn button-primary m-1"
                                            style={{
                                                backgroundColor: 'rgba(30, 30, 30, 0.7)',
                                                color: 'white'
                                            }}>
                                            <FaPlus className="me-1 mb-1" />
                                            Coup
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pie Charts */}
                    <div className="charts mt-1">
                        <div className="row justify-content-center">
                            {/* Gaming Preference Stats */}
                            <div className="game-preference-chart col-md-6 p-1 d-flex flex-column align-items-center text-start">
                                <h4>Game Genres</h4>
                                <Chart
                                    width={'100%'}
                                    height={'300px'}
                                    chartType="PieChart"
                                    loader={<div>Loading Chart</div>}
                                    data={gamePreferenceData}
                                    options={{
                                        is3D: true,
                                        backgroundColor: 'transparent',
                                        titleTextStyle: {
                                        color: '#FFFFFF',
                                        fontSize: 18,
                                        bold: true,
                                        },
                                        pieSliceText: 'label',
                                        pieSliceTextStyle: {
                                        color: 'white',
                                        label: 'none',
                                        },
                                        legend: 'none',
                                        slices: {
                                        0: { color: '#426574' },
                                        1: { color: '#4c7582' },
                                        2: { color: '#507a88' },
                                        3: { color: '#55808f' },
                                        4: { color: '#5b8898' },
                                        5: { color: '#6391a1' },
                                        },
                                        tooltip: {
                                        text: 'percentage',
                                        showColorCode: true,
                                        },
                                        chartArea: {
                                        width: '90%',
                                        height: '80%',
                                        },
                                    }}
                                />
                            </div>
                            {/* Gaming Style */}
                            <div className="chart-container col-md-6 p-1 d-flex flex-column align-items-center text-start">
                                <h4>Play Style</h4>
                                <Chart
                                    width={'100%'}
                                    height={'300px'}
                                    chartType="PieChart"
                                    loader={<div>Loading Chart</div>}
                                    data={playStyleData}
                                    options={{
                                        is3D: true,
                                        backgroundColor: 'transparent',
                                        titleTextStyle: {
                                        color: '#FFFFFF',
                                        fontSize: 18,
                                        bold: true,
                                        },
                                        pieSliceText: 'label',
                                        pieSliceTextStyle: {
                                        color: 'white',
                                        },
                                        legend: 'none',
                                        slices: {
                                        0: { color: '#426574' },
                                        1: { color: '#4c7582' },
                                        2: { color: '#5b8898' },
                                        3: { color: '#6391a1' },
                                        },
                                        tooltip: {
                                        text: 'percentage',
                                        showColorCode: true,
                                        },
                                        chartArea: {
                                        width: '90%',
                                        height: '80%',
                                        },
                                    }}
                                />
                            </div>

                        </div>
                    </div>

                    {/* Cards Section */}
                        <div className="row justify-content-center">
                            {/* Games Played */}
                            <div
                                className="games-played card col-md-5 me-3 p-3 d-flex flex-column align-items-center text-start"
                                style={{
                                    backgroundColor: 'rgba(66, 66, 66, 0.6)',
                                    color: 'white'
                                }}>
                                <h3>Most Loved Games</h3>
                                <ul>
                                    <li>Hardcoded List</li>
                                    <li>Wingspan</li>
                                    <li>Settlers of Catan</li>
                                    <li>Codenames</li>
                                    <li>Boggle</li>
                                    <li>Apples to Apples</li>
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
                                            <Link to="/under-construction" className="text-decoration-none mb-1">Terms Of Service</Link>
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
