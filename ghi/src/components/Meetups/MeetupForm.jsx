import { useState, useEffect, useContext } from "react";
import Nav from "../Nav";
import { tryFetch } from "../../utils";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

function CreateMeetup() {
    const { user } = useContext(AuthContext);
    const [game, setGame] = useState([]);
    const [location, setLocation] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:8000/api/game/')
            .then((response) => response.json())
            .then((data) => setGame(data))
            .catch((error) => console.error('Error fetching games:', error));

        fetch('http://localhost:8000/api/location/')
            .then((response) => response.json())
            .then((data) => setLocation(data))
            .catch((error) => console.error('Error fetching games:', error));
    }, [user]);

    const [meetupName, setMeetupName] = useState('')
    const handleMeetupName = (event) => {
        const value = event.target.value
        setMeetupName(value)
    }

    const [gameId, setGameId] = useState('')
    const handleGameId = (event) => {
        const value = event.target.value
        setGameId(value)
    }

    const [locationId, setLocationId] = useState('')
    const handleLocationId = (event) => {
        const value = event.target.value
        setLocationId(value)
    }

    const [startTime, setStartTime] = useState('')
    const handleStartTime = (event) => {
        const value = event.target.value
        setStartTime(value)
    }

    const [endTime, setEndTime] = useState('')
    const handleEndTime = (event) => {
        const value = event.target.value
        setEndTime(value)
    }

    const [description, setDescription] = useState('')
    const handleDescription = (event) => {
        const value = event.target.value
        setDescription(value)
    }

    const [minPlayers, setMinPlayers] = useState('1')
    const handleMinPlayers = (event) => {
        const value = event.target.value
        if (parseInt(value) < 1) {
            setMinPlayers('1')
        } else {
            setMinPlayers(value)
        }
    }

    const [maxPlayers, setMaxPlayers] = useState('')
    const handleMaxPlayers = (event) => {
        const value = event.target.value
        if (parseInt(value) < 1) {
            setMaxPlayers('1')
        } else {
            setMaxPlayers(value)
        }
    }

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (parseInt(minPlayers) < 1) {
            setErrorMessage('Minimum players must be at least 1.')
            return
        }

        if (maxPlayers !== '' && parseInt(maxPlayers) < 1) {
            setErrorMessage('Maximum players must be at least 1.')
            return
        }

        if (maxPlayers !== '' && parseInt(maxPlayers) < parseInt(minPlayers)) {
            setErrorMessage(
                'Maximum players cannot be less than minimum players.'
            )
            return
        }

        if (new Date(endTime) <= new Date(startTime)) {
            setErrorMessage('End time must be after the start time.')
            return
        }

        const data = {}

        data.meetup_name = meetupName
        data.game_id = gameId
        data.location_id = locationId
        data.start_time = startTime
        data.end_time = endTime
        data.description = description
        data.min_players = minPlayers
        data.max_players = maxPlayers
        data.status = "scheduled"

        console.log("DATA", data)

        const url = "http://localhost:8000/api/meetup/"
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const apicall = await tryFetch(url,fetchConfig)
        console.log("this is the api call", apicall)
        navigate("/meetup")
    }

    return(
    <>
        <Nav />
        <div
            className=" container row shadow"
            style={{ backgroundColor: 'rgba(47, 47, 47, 0.8)', color: 'white'}}
        >
            <div className="col- ">
                <div className="mt-3">
                    <h1>Create a Meetup</h1>
                    <form onSubmit={handleSubmit} id="create-meetup-form">
                        {errorMessage && (
                            <div className="alert alert-danger" role="alert">
                                {errorMessage}
                            </div>
                        )}

                        <div className="form-floating m-3">
                            <input
                            onChange={handleMeetupName}
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
                            className="form-select"
                            required>
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
                            className="form-select"
                            required>

                                <option value="">Select Location</option>
                                {location.map((location) => (
                                    <option key={location.id} value={location.id}>
                                        {location.name} - {location.city}, {location.state}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-floating m-3">
                            <input
                            onChange={handleStartTime}
                            placeholder="Start"
                            type="datetime-local"
                            name="start"
                            id="start"
                            className="form-control"
                            required
                             />
                             <label>Start</label>
                        </div>
                        <div className="form-floating m-3">
                            <input
                            onChange={handleEndTime}
                            placeholder="End"
                            type="datetime-local"
                            name="end"
                            id="end"
                            className="form-control"
                            required
                             />
                             <label>End</label>
                        </div>
                        <div className="form-floating m-3">
                            <textarea
                            onChange={handleDescription}
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
                            placeholder="1"
                            type="number"
                            name="minPlayers"
                            id="minPlayers"
                            className="form-control"
                            required
                            min="1"
                             />
                             <label>Minimum Players</label>
                        </div>
                        <div className="form-floating m-3">
                            <input
                            onChange={handleMaxPlayers}
                            placeholder="4"
                            type="number"
                            name="max_players"
                            id="max_players"
                            className="form-control"
                            required
                            min="1"
                             />
                             <label>Maximum Players</label>
                        </div>
                        <button type="submit" className="btn btn-primary mb-5 col-10">Create</button>
                    </form>
                </div>
            </div>
        </div>
    </>
    )
}
export default CreateMeetup
