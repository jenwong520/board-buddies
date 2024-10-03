import { useState, useEffect, useContext } from "react";
import Nav from "../Nav";
import { tryFetch } from "../../utils";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

function MeetupEditForm() {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [game, setGame] = useState([]);
    const [location, setLocation] = useState([]);

    const [meetupName, setMeetupName] = useState('');
    const [gameId, setGameId] = useState('');
    const [locationId, setLocationId] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [description, setDescription] = useState('');
    const [minPlayers, setMinPlayers] = useState('');
    const [maxPlayers, setMaxPlayers] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            console.log("MID", id)
            try {
                const [meetupResponse, gameResponse, locationResponse] = await Promise.all([
                    fetch(`http://localhost:8000/api/meetup/${id}`),
                    fetch('http://localhost:8000/api/game/'),
                    fetch('http://localhost:8000/api/location/')
                ]);

                if(meetupResponse.ok && gameResponse.ok && locationResponse.ok) {
                    const meetupData = await meetupResponse.json();
                    const gameData = await gameResponse.json();
                    const locationData = await locationResponse.json()

                    console.log("MD", meetupData)
                    console.log("GD", gameData)
                    console.log("LD", locationData)

                    setGame(gameData);
                    setLocation(locationData);

                    setMeetupName(meetupData.meetup_name);
                    setGameId(meetupData.game_id);
                    setLocationId(meetupData.location_id);

                    setStartTime(meetupData.start_time);
                    setEndTime(meetupData.end_time);
                    setDescription(meetupData.description);
                    setMinPlayers(meetupData.min_players);
                    setMaxPlayers(meetupData.max_players);
                } else {
                    setErrorMessage('Failed to load data');
                }
            } catch (error) {
                console.error('Fetch error:', error);
                setErrorMessage('Unexpected error occurred while fetching data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleMeetupName = (event) => {
        const value = event.target.value
        setMeetupName(value)
    }

    const handleGameId = (event) => {
        const value = event.target.value
        setGameId(value)
    }

    const handleLocationId = (event) => {
        const value = event.target.value
        setLocationId(value)
    }

    const handleStartTime = (event) => {
        const value = event.target.value
        setStartTime(value)
    }

    const handleEndTime = (event) => {
        const value = event.target.value
        setEndTime(value)
    }

    const handleDescription = (event) => {
        const value = event.target.value
        setDescription(value)
    }

    const handleMinPlayers = (event) => {
        const value = event.target.value
        setMinPlayers(value)
    }

    const handleMaxPlayers = (event) => {
        const value = event.target.value
        setMaxPlayers(value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {}

        data.meetup_name = meetupName
        data.game_id = gameId
        data.location_id = locationId
        data.start_time = new Date(startTime).toISOString()
        data.end_time = new Date(endTime).toISOString()
        data.description = description
        data.min_players = minPlayers
        data.max_players = maxPlayers

        console.log(data)

        const url = `http://localhost:8000/api/meetup/${id}/`;
        const fetchConfig = {
            method: "PUT",
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const apicall = await tryFetch(url,fetchConfig)
        console.log("this is the api call", apicall)
        navigate(`/meetup/${id}`)
    }

    const handleDelete = async () => {
        const url = `http://localhost:8000/api/meetup/${id}/`;
        const fetchConfig = {
            method: "DELETE",
            credentials: 'include',
        };

        try {
            const response = await fetch(url, fetchConfig);
            if (response.ok) {
                navigate('/meetup');
            } else {
                setErrorMessage('Failed to delete the meetup');
            }
        } catch (error) {
            console.error('Delete error:', error);
            setErrorMessage('An error occurred while deleting the meetup');
        }
    };

    if (loading) {
        return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
            <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
            </div>
        </div>
        );
  }

    return(
    <>
        <Nav />
        <div className=" container row shadow bg-white rounded">
            <div className="col- ">
                <div className="mt-3">
                    <h1>Edit Your Meetup</h1>
                    <form onSubmit={handleSubmit} id="create-meetup-form">

                        <div className="form-floating m-3">
                            <input
                            onChange={handleMeetupName}
                            value={meetupName || ''}
                            placeholder="Name of your meetup"
                            type="text"
                            name="name"
                            id="name"
                            className="form-control"
                            required
                             />
                             <label>Title</label>
                        </div>
                        <div className="form-floating m-3">
                            <select
                            name="game"
                            id="game"
                            onChange={handleGameId}
                            value={gameId || ''}
                            className="form-select">
                                <option value="">Select Game</option>
                                {game.map((game) => (
                                    <option key={game.id} value={game.id}>
                                        {game.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-floating m-3">
                            <select
                            name="location"
                            id="location"
                            onChange={handleLocationId}
                            value={locationId || ''}
                            className="form-select">
                                <option value="">Select Location</option>
                                {location.map((location) => (
                                    <option key={location.id} value={location.id}>
                                        {location.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-floating m-3">
                            <input
                            onChange={handleStartTime}
                            value={startTime || ''}
                            placeholder="Start"
                            type="datetime-local"
                            name="start"
                            id="start"
                            className="form-control"
                             />
                             <label>Start</label>
                        </div>
                        <div className="form-floating m-3">
                            <input
                            onChange={handleEndTime}
                            value={endTime || ''}
                            placeholder="End"
                            type="datetime-local"
                            name="end"
                            id="end"
                            className="form-control"
                             />
                             <label>End</label>
                        </div>
                        <div className="form-floating m-3">
                            <textarea
                            onChange={handleDescription}
                            value={description || ''}
                            placeholder="Your description here"
                            type="text"
                            name="description"
                            id="description"
                            className="form-control"
                            style={{height: "10em"}}
                             />
                             <label>Description</label>
                        </div>
                        <div className="form-floating m-3">
                            <input
                            onChange={handleMinPlayers}
                            value={minPlayers || ''}
                            placeholder="1"
                            type="number"
                            name="minPlayers"
                            id="minPlayers"
                            className="form-control"
                             />
                             <label>Minimum Players</label>
                        </div>
                        <div className="form-floating m-3">
                            <input
                            onChange={handleMaxPlayers}
                            value={maxPlayers || ''}
                            placeholder="4"
                            type="number"
                            name="max_players"
                            id="max_players"
                            className="form-control"
                             />
                             <label>Maximum Players</label>
                        </div>
                        <button type="submit" className="btn btn-primary mb-5 col-10">Save Changes</button>
                        <div className="mt-5">
                            <p>Do you want to delete your meetup?</p>
                            <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete Meetup</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
    )
}

export default MeetupEditForm
