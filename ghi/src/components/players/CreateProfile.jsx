import { useState, useEffect, useContext } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { AuthContext } from "../../components/AuthProvider";
import { data } from '../../assets/statesData.js'
// import { tagCategories } from '../../assets/tagsData.js'     // Work in progress for tags
// import { FaPlus } from 'react-icons/fa';                     // Work in progress for tags
import profileIcon from "/default/default-icon.png"
import banner from "../../img/Board-buddies-banner.png"
import ProfilePicModal from "./ProfilePicModal";
import './Profile.css';
import Nav from "../Nav";


function CreateProfilePage() {
    const [profile, setProfile] = useState({
        profile_picture: '',
        email: '',
        first_name: '',
        last_name: '',
        city: '',
        state: '',
        about_me: '',
        birthdate: ''
        // tags: {
        //     frequencyOfPlay: [],
        //     groupSize: [],
        //     playStyle: [],
        //     gameGenres: [],
        //     playedGames: []
        // },
    });
    const { user } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [profilePicture, setProfilePicture] = useState(user.profilePicture || '/default-profile.png');

// const [selectedTags, setSelectedTags] = useState(profile.tags || []);    // Work in progress for tags


    useEffect(() => {
        const fetchPlayer = async () => {
            const url = `http://localhost:8000/api/players/${user.user_id}/`;
            try {
                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();
                    setProfile({
                        profile_picture: data.profile_picture,
                        email: data.email,
                        first_name: data.first_name,
                        last_name: data.last_name,
                        city: data.city,
                        state: data.state,
                        about_me: data.about_me,
                        birthdate: data.birthdate,
                        // tags: data.tags || {
                        //     frequencyOfPlay: [],
                        //     groupSize: [],
                        //     playStyle: [],
                        //     gameGenres: [],
                        //     playedGames: []
                        // },
                    });
                    
                    setProfilePicture(data.profile_picture || profileIcon);

                } else {
                    setErrorMessage('Failed to fetch player data.');
                }
            } catch (error) {
                setErrorMessage('An error occurred while fetching the data.');
            }
        };

        fetchPlayer();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
         const updatedProfile = {
        ...profile,
        profile_picture: profilePicture,
        // tags: selectedTags,
        // {
            //     frequencyOfPlay: profile.tags.frequencyOfPlay,
            //     groupSize: profile.tags.groupSize,
            //     playStyle: profile.tags.playStyle,
            //     gameGenres: profile.tags.gameGenres,
            //     playedGames: profile.tags.playedGames,
            // }
    };
        const url = `http://localhost:8000/api/players/`;
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(updatedProfile),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const response = await fetch(url, fetchConfig);
            if (response.ok) {
                navigate('/dashboard');
            } else {
                const errorData = await response.json();
                console.error('Error response data:', errorData);
                setErrorMessage(`${errorData.message}`);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setErrorMessage('An unexpected error occurred. Please try again.');
        }
    };

    // Work in progress for tags

    //     const handleTagToggle = (category, tag) => {
    //         setProfile((prevProfile) => {
    //             const selectedTags = prevProfile.tags[category] || [];
    //         const newTags = selectedTags.includes(tag)
    //             ? selectedTags.filter((t) => t !== tag)
    //             : [...selectedTags, tag];

    //         return {
    //             ...prevProfile,
    //             tags: {
    //                 ...prevProfile.tags,
    //                 [category]: newTags,
    //             },
    //         };
    //     });
    // };


    // const renderTagSection = (title, categoryTags, categoryKey) => (
        //     <div className="tag-selection-section mb-3 mt-2 mx-2">
        //         <h4 style={{ fontFamily: 'Arial, sans-serif', fontSize: '1rem', fontWeight: '500', color: 'white'}}>{title}</h4>
        //         <div className="d-flex flex-wrap justify-content-center">
        //             {categoryTags.map((tag, index) => (
            //                 <button
            //                     key={index}
    //                     type="button"
    //                     className={`btn ${profile.tags[categoryKey]?.includes(tag) ? 'btn-light' : 'btn-outline-light'} m-1`}
    //                     onClick={() => handleTagToggle(categoryKey, tag)}
    //                 >
    //                     <FaPlus className="me-1 mb-1" />
    //                     {tag}
    //                 </button>
    //             ))}
    //         </div>
    //     </div>
    // );


        return (
    <>
        <Nav />
        <div
            className="card"
            style={{ backgroundColor: 'rgba(47, 47, 47, 0.8)', color: 'white', marginBottom: '15%' }}
        >
            <div className="create-profile-page container mt-4">
                {/* Banner */}
                <div className="text-center m-3">
                    <img className="img-fluid" src={banner} alt="Banner" style={{ width: 'auto', height: 'auto' }} />
                </div>

                {/* Create Profile Title Banner */}
                <div className="text-center mb-4">
                    <h1 className="display-4" style={{ color: '#f8f9fa' }}>Create Profile</h1>
                    <hr style={{ width: '50%', margin: 'auto', backgroundColor: '#f8f9fa' }} />
                </div>

                <form onSubmit={handleSubmit} id="create-profile-form">
                    {/* Profile Picture/Username Section - Left Column */}
                    <div className="row justify-content-center">
                        <div className="col-md-3 mt-5 pt-4 ps-4 d-flex flex-column align-items-center text-start">
                            <ProfilePicModal setProfilePicture={setProfilePicture} user={user} />
                            <NavLink className="d-block" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                <img
                                    className="img-fluid rounded-circle mb-3"
                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                    src={profilePicture || profileIcon}
                                    alt="Profile"
                                    title="Change Profile Picture"
                                />
                            </NavLink>
                            <h1 className="auto-font mb-1" style={{ fontSize: '1.3vw' }}>{user.username}</h1>

                        </div>

                        {/* Form Inputs Section - Right Column */}
                        <div className="col-md-9 pe-4">
                            <div
                                className="card shadow p-4 mb-4"
                                style={{ backgroundColor: 'rgba(66, 66, 66, 0.7)' }}
                            >
                                {/* Full Name Inputs */}
                                <div className="row mb-2">
                                    {/* First Name Input */}
                                    <div className="col-md-6 pe-1">
                                        <input
                                            value={profile.first_name || ''}
                                            onChange={(e) =>
                                                setProfile({
                                                    ...profile,
                                                    first_name: e.target.value,
                                                })
                                            }
                                            id="first_name"
                                            type="text"
                                            placeholder="First Name"
                                            className="form-control"
                                        />
                                    </div>
                                    {/* Last Name Input */}
                                    <div className="col-md-6 ps-1">
                                        <input
                                            value={profile.last_name || ''}
                                            onChange={(e) =>
                                                setProfile({
                                                    ...profile,
                                                    last_name: e.target.value,
                                                })
                                            }
                                            id="last_name"
                                            type="text"
                                            placeholder="Last Name"
                                            className="form-control"
                                        />
                                    </div>
                                </div>

                                {/* Email Input */}
                                <div className="mb-2">
                                    <input
                                        value={profile.email}
                                        onChange={handleChange}
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                        className="form-control"
                                    />
                                </div>

                                {/* City & State Line */}
                                <div className="row mb-2">
                                    <div className="col-md-9 pe-1">
                                        <input
                                            value={profile.city || ''}
                                            onChange={(e) => setProfile({ ...profile, city: e.target.value || '' })}
                                            type="text"
                                            placeholder="City"
                                            id="city"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="col-md-3 ps-1">
                                        <select
                                            value={profile.state || ''}
                                            onChange={(e) => setProfile({ ...profile, state: e.target.value || '' })}
                                            className="form-select"
                                            id="state"
                                        >
                                            <option value="">State</option>
                                            {data.map((item) => (
                                                <option key={item.abbreviation} value={item.abbreviation}>
                                                    {item.abbreviation}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* About Me Input */}
                                <div className="mb-2">
                                    <textarea
                                        value={profile.about_me || ''}
                                        onChange={(e) => setProfile({ ...profile, about_me: e.target.value || '' })}
                                        placeholder="About Me"
                                        id="about"
                                        className="form-control"
                                        rows="4"
                                    />
                                </div>

                                {/* Birthdate Input */}
                                <div className="form-floating mb-2">
                                    <input
                                        value={profile.birthdate}
                                        onChange={handleChange}
                                        name="birthdate"
                                        type="date"
                                        className="form-control"
                                    />
                                    <label htmlFor="birthdate">Birthdate</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Work in progress for tags */}
                    {/* Preferences Sections*/}
                    {/* <h1 className="display-6 mb-4" style={{ color: '#f8f9fa' }}>Preferences</h1>
                    <div className="row m-1">
                        <div className="col-md-6 d-flex">
                            <div className="card shadow mb-3 flex-fill" style={{ backgroundColor: 'rgba(66, 66, 66, 0.5)' }}>
                                {renderTagSection('Frequency', tagCategories.frequencyOfPlay, 'frequencyOfPlay')}
                            </div>
                        </div>
                        <div className="col-md-6 d-flex">
                            <div className="card shadow mb-3 flex-fill" style={{ backgroundColor: 'rgba(66, 66, 66, 0.5)' }}>
                                {renderTagSection('Preferred Group Size', tagCategories.groupSize, 'groupSize')}
                            </div>
                        </div>
                    </div>
                    <div className="row m-1">
                        <div className="col-md-6 d-flex">
                            <div className="card shadow mb-3 flex-fill" style={{ backgroundColor: 'rgba(66, 66, 66, 0.5)' }}>
                                {renderTagSection('Play Style', tagCategories.playStyle, 'playStyle')}
                            </div>
                        </div>
                        <div className="col-md-6 d-flex">
                            <div className="card shadow mb-3 flex-fill" style={{ backgroundColor: 'rgba(66, 66, 66, 0.5)' }}>
                                {renderTagSection('Game Genres', tagCategories.gameGenres, 'gameGenres')}
                            </div>
                        </div>
                    </div>
                    <div className="row m-1">
                        <div className="col-md-12 d-flex">
                            <div className="card shadow mb-3 flex-fill" style={{ backgroundColor: 'rgba(66, 66, 66, 0.5)' }}>
                                {renderTagSection('Games Played', tagCategories.playedGames, 'playedGames')}
                            </div>
                        </div>
                    </div> */}

                    {/* Save Button & Errors */}
                    <div className="row justify-content-center">
                        <div className="col-md-3 text-center">
                            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                            <button
                                className="btn mb-4"
                                type="submit"
                                style={{ backgroundColor: 'rgba(47, 47, 47, 0.6)', color: 'white' }}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </>
);
}

export default CreateProfilePage;
