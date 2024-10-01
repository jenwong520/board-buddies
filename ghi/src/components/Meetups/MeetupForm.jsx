import { useState, useEffect, useContext } from "react";
import Nav from "../Nav";
import { tryFetch } from "../../utils";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

function CreateMeetup() {

    const { user } = useContext(AuthContext)

    const [game, setGame] = useState([]);
    const [location, setLocation] = useState([])

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

    console.log(game)
    console.log(location)
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

    const [meetupDate, setMeetupDate] = useState('')
    const handleMeetupDate = (event) => {
        const value = event.target.value
        setMeetupDate(value)
    }

    const [description, setDescription] = useState('')
    const handleDescription = (event) => {
        const value = event.target.value
        setDescription(value)
    }

    const [minPlayers, setMinPlayers] = useState('')
    const handleMinPlayers = (event) => {
        const value = event.target.value
        setMinPlayers(value)
    }

    const [maxPlayers, setMaxPlayers] = useState('')
    const handleMaxPlayers = (event) => {
        const value = event.target.value
        setMaxPlayers(value)
    }

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {}

        data.game_id = gameId
        data.location_id = locationId
        data.meetup_date = meetupDate
        data.description = description
        data.min_players = minPlayers
        data.max_players = maxPlayers
        data.status = "scheduled"

        console.log(data)

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
        <div className="row ">
            <div className="col">
                <div className="shadow bg-white">
                    <h1>Create a Meetup</h1>
                    <form onSubmit={handleSubmit} id="create-meetup-form">
                        <div className="form-floating m-3">
                            <select
                            name="game"
                            id="game"
                            onChange={handleGameId}
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
                            onChange={handleMeetupDate}
                            placeholder="Date"
                            type="datetime-local"
                            name="date"
                            id="date"
                            className="form-control"
                             />
                             <label>Meetup Date</label>
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
                             />
                             <label>Maximum Players</label>
                        </div>
                        <button type="submit" className="btn btn-primary mb-5">Create</button>
                    </form>
                </div>
            </div>
        </div>
    </>
    )
}
export default CreateMeetup
