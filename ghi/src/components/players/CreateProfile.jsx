import { useState, useEffect, useContext } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { AuthContext } from "../../components/AuthProvider";
import { data } from '../../assets/statesData.js'
import profileIcon from "/default/default-icon.png"
import banner from "../../img/Board-buddies-banner.png"
import ProfilePicModal from "./ProfilePicModal";
import './Profile.css';
import Nav from "../Nav";

// import 'bootstrap/dist/js/bootstrap.bundle.min';
// import { TagSelector } from '../../components/TagSelector';


function CreateProfilePage() {
    const [profile, setProfile] = useState({
        profile_picture: '',
        email: '',
        first_name: '',
        last_name: '',
        city: '',
        state: '',
        about_me: '',
        birthdate: '',
        tags: '',
    });
    const { user } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [profilePicture, setProfilePicture] = useState(user.profilePicture || '/default-profile.png');

    // const [selectedTags, setSelectedTags] = useState(profile.tags || []);
    // const [inputTag, setInputTag] = useState('');


    // // Function to toggle tag selection
    // const handleTagToggle = (tag) => {
    // if (selectedTags.includes(tag)) {
    //     setSelectedTags(selectedTags.filter((t) => t !== tag)); // Remove if selected
    // } else {
    //     setSelectedTags([...selectedTags, tag]); // Add if not selected
    // }
    // };


    // Fetch player data when the component mounts
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
                        tags: data.tags,
                    });
                    // Set profilePicture from fetched data
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

    // Handle changes in the form fields
    const handleChange = (event) => {
        const { name, value } = event.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    // Handle form submission`
    const handleSubmit = async (event) => {

        // Ensure you're using the latest profile and profilePicture states
        event.preventDefault();
         const updatedProfile = {
        ...profile,
        profile_picture: profilePicture, // Include the selected profile picture
        // tags: selectedTags,
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

    // Work in progress

    // const handleTagsChange = (tags) => {
    //     setProfile({ ...profile, tags });
    // };

    // const handleAddTag = (e) => {
    //     e.preventDefault();
    //     if (inputTag && !profile.tags.includes(inputTag)) {
    //         setProfile({ ...profile, tags: [...profile.tags, inputTag] });
    //         setInputTag(''); // Clear the input
    //     }
    // };

    // const handleRemoveTag = (tagToRemove) => {
    //     setProfile({ ...profile, tags: profile.tags.filter(tag => tag !== tagToRemove) });
    // };

    return (
        <>
            < Nav />
                <div className="card" style={{ backgroundColor: 'rgba(47, 47, 47, 0.8)', color: 'white', marginBottom: '15%' }}>
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

                        {/* Left Column with Profile Picture and Username */}
                        <div className="row justify-content-center">
                            <div className="col-md-3 d-flex flex-column align-items-center text-start">
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
                            <div className="mb-3">
                                <h1 className="auto-font fs-3 mb-1">{user.username}</h1>
                            </div>
                        </div>

                        {/* Right Column with Form Section in a Card */}
                        <div className="col-md-9">
                            <div className="card shadow p-4 mb-4 me-4" style={{ backgroundColor: 'rgba(66, 66, 66, 0.7)'}}>
                                <form onSubmit={handleSubmit} id="create-profile-form">
                                    {/* Full Name Input */}
                                    <div className="row mb-2">
`                                        {/* First Name Input */}
                                        <div
                                            className="col-md-5 pe-1"
                                            style={{
                                                padding: '0.25rem 0.5rem',
                                                fontSize: '0.875rem',
                                                height: 'auto',
                                                width: '48%'
                                            }}>
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
                                        <div
                                            className="col-md-5 ps-1"
                                            style={{
                                                padding: '0.25rem 0.5rem',
                                                fontSize: '0.875rem',
                                                height: 'auto',
                                                width: '50%'
                                            }}>
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
                                    {/* Keeping In Case Of Wanting To Revert Back */}
                                    {/* Combined First Name and Last Name Input */}
                                    {/* <div className="form-floating mb-3">
                                        <input
                                            value={`${profile.first_name || ''} ${profile.last_name || ''}`}
                                            onChange={(e) => {
                                                const [first_name, ...last_name] = e.target.value.split(' ');
                                                setProfile({
                                                    ...profile,
                                                    first_name: first_name || '',
                                                    last_name: last_name.join(' ') || ''
                                                });
                                            }}
                                            type="text"
                                            placeholder="Full Name"
                                            id="full_name"
                                            className="form-control"
                                            required
                                            />
                                        <label htmlFor="full_name">Full Name</label>
                                    </div> */}
                                    <div className="mb-3">
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
                                    <div className="row mb-3">
                                        {/* City Input */}
                                        <div className="col-md-9 pe-1">
                                            <div>
                                                <input
                                                    value={profile.city || ''}
                                                    onChange={(e) => setProfile({ ...profile, city: e.target.value || '' })}
                                                    type="text"
                                                    placeholder="City"
                                                    id="city"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                        {/* State Dropdown */}
                                        <div className="col-md-3 ps-1">
                                            <div>
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
                                    </div>

                                    {/* About Me Input */}
                                    <div className="mb-3">
                                        <textarea
                                            value={profile.about_me || ''}
                                            onChange={(e) => setProfile({ ...profile, about_me: e.target.value || '' })}
                                            placeholder="About Me"
                                            id="about"
                                            className="form-control"
                                            rows="4"
                                        />
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input
                                            value={profile.birthdate}
                                            onChange={handleChange}
                                            name="birthdate"
                                            type="date"
                                            className="form-control"
                                        />
                                        <label htmlFor="birthdate">Birthdate</label>
                                    </div>
                                    {/* <div className="tag-selection">
                                        <h3>Select Preferences</h3>
                                        {availableTags.map((tag, index) => (
                                        <button
                                            key={index}
                                            className={`btn ${selectedTags.includes(tag) ? 'btn-primary' : 'btn-secondary'} m-1`}
                                            onClick={() => handleTagToggle(tag)}
                                        >
                                            {tag}
                                        </button>
                                        ))}
                                    </div> */}

                                    {/* Tag Selection Section
                                    <TagSelector selectedTags={profile.tags} setSelectedTags={handleTagsChange} /> */}

                                    <div className="mb-3">
                                        <input
                                            value={profile.tags}
                                            onChange={handleChange}
                                            name="tags"
                                            type="text"
                                            placeholder="Tags"
                                            className="form-control"
                                        />
                                    </div>
                                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                                    <button className="btn mb-2" type="submit" style={{ backgroundColor: 'rgba(47, 47, 47, 0.6)', color: 'white' }}>
                                        Save
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
);
}

export default CreateProfilePage;
