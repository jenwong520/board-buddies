import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Nav from '../Nav';

function MeetupsList() {
    const [meetups, setMeetups] = useState([])
    const [search, setSearch] = useState('')


    useEffect(() => {
        fetch('http://localhost:8000/api/meetup/')
            .then((response) => response.json())
            .then((data) => {setMeetups(data)})
            .catch((error) => console.error('Error fetching meetups:', error));
    }, []);

    return (
        <>
            <Nav />
            <div className='container'>
                <h1 className='mt-5 text-white' style={{padding:"30px"}}>Meetups List</h1>
                <form action="">
                    <input
                        type="text"
                        placeholder='Search Games'
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        className='form-control mb-3'/>
                </form>
                <div className="game-list">
                    {meetups.length > 0 ? (
                        meetups.filter((game) => {
                            return search.toLowerCase() === ''
                            ? game : game.meetup.game_name.toLowerCase().includes(search.toLowerCase())
                        }).map((meetup) => (
                            <Link to={`/meetup/${meetup.meetup.id}`} key={meetup.meetup.id} className="game-item">
                                <div
                                    className="game-background"
                                    style={{ backgroundImage: `url(${meetup.meetup.game_image})`,
                                    backgroundPosition: "left",
                                    backgroundSize: "cover"
                                }}
                                >
                                    <div className="game-details">
                                        <h2 className='fs-4'>{new Date(meetup.meetup.meetup_date).toLocaleString()}</h2>
                                        <h4 className='mt-2'>Organizer: {meetup.meetup.organizer_username}</h4>
                                        <p className='mt-2'>Meetup Game : {meetup.meetup.game_name}</p>
                                        <p className='mt-2'>Players: {meetup.meetup.min_players} - {meetup.meetup.max_players}</p>
                                        <p className='mt-2'>Location: {meetup.meetup.location_name}</p>
                                        <p>{meetup.meetup.location_city}, {meetup.meetup.location_state}</p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p>Meetups coming soon!</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default MeetupsList;
