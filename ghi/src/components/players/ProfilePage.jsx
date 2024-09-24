import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Chart from 'react-google-charts';
import './ProfilePage.css';

export default function ProfilePage() {
    const { username } = useParams();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        // Fetch player data from API
        async function fetchPlayerData() {
            try {
                const response = await axios.get(`/api/players/${username}`);
                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching player data', error);
            }
        }
        fetchPlayerData();
    }, [username]);

    if (!profile) {
        return <p>Loading...</p>; // Show a loading state
    }

    return (
        <div className="profile-page">
            <div className="profile-header">
                <img src={profile.profilePicture || '/default-profile.png'} alt="Profile" className="profile-picture" />
                <div className="profile-info">
                    <h1>{profile.username}</h1>
                    <button className="edit-profile-btn">Edit Profile</button>
                </div>
            </div>

            <div className="user-info">
                <h2>{profile.name}</h2>
                <p>{profile.location}</p>
                <p>{profile.aboutMe}</p>
                <div className="badges">
                    {profile.badges.map((badge, index) => (
                        <span className={`badge badge-${badge.toLowerCase().replace(' ', '-')}`} key={index}>
                            {badge}
                        </span>
                    ))}
                    {/* <span className="badge">Trusted Game Host</span>
                    <span className="badge">Approved Play Tester</span>
                    <span className="badge">Verified Player</span>
                    <span className="badge">Game Developer</span> */}
                </div>
            </div>

            <div className="preferences">
                <h3>Preferences</h3>
                <button>{profile.playFrequency}</button>
                <button>{profile.groupSize}</button>
                {/* <button>1-2 times a month</button>
                <button>Larger Groups</button> */}
            </div>

            <div className="charts">
                <div className="game-preference-chart">
                    <h3>Game Preference Stats</h3>
                    <Chart
                        width={'100%'}
                        height={'300px'}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['Type', 'Percentage'],
                            ['Cooperative', profile.gamePreferences.cooperative],
                            ['Speed', profile.gamePreferences.speed],
                            ['Strategy', profile.gamePreferences.strategy],
                            ['Cards', profile.gamePreferences.cards],
                        ]}
                        options={{ is3D: true }}
                    />
                </div>
                <div className="chart-container">
                    <h3>Gaming Style</h3>
                    <Chart
                        width={'100%'}
                        height={'300px'}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['Type', 'Percentage'],
                            ['Speedy', profile.gamingStyle.speedy],
                            ['Competitive', profile.gamingStyle.competitive],
                            ['Relaxed', profile.gamingStyle.relaxed],
                            ['Cooperative', profile.gamingStyle.cooperative],
                        ]}
                        options={{ is3D: true }}
                    />
                </div>
            </div>

            <div className="games-played">
                <h3>Games I Play</h3>
                <ul>
                    {profile.gamesPlayed.map((game, index) => (
                        <li key={index}>{game}</li>
                    ))}
                    {/* <li>Settlers of Catan</li>
                    <li>Boggle</li>
                    <li>Apples to Apples</li>
                    <li>Wingspan</li>
                    <li>Monopoly</li> */}
                </ul>
            </div>

            <div className="useful-links">
                <h3>Links</h3>
                <ul>
                    <li><a href="/contact">Contact</a></li>
                    <li><a href="/settings">Settings</a></li>
                    <li><a href="/preferences-quiz">Preferences Quiz</a></li>
                    <li><a href="/apply-game-host">Apply to be a Game Host</a></li>
                </ul>
            </div>
        </div>
    )
}
