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
                <h1 className='mt-5' style={{padding:"80px"}}>Meetups List</h1>
                <form action="">
                    <input
                        type="text"
                        placeholder='Search Games'
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        className='form-control mb-2'/>
                </form>
                <div className="game-list">
                    {meetups.length > 0 ? (
                        meetups.filter((game) => {
                            return search === '' ? game : game.game_id.includes(search)
                        }).map((meetup) => (
                            <Link to={`/meetup/${meetup.meetup.id}`} key={meetup.meetup.id} className="game-item">
                                <div
                                    className="game-background"
                                //     style={{ backgroundImage: `url(${game.game_image})`,
                                //     backgroundPosition: "20% 40%"
                                // }}
                                >
                                    <div className="game-details">
                                        <h4>{meetup.meetup.id}</h4>
                                        <p>Meetup Game : {meetup.meetup.game_id}</p>
                                        <p>Players: {meetup.meetup.min_players} - {meetup.meetup.max_players}</p>
                                        <p>Location: {meetup.meetup.location_id}</p>
                                        {/* <p>test - {meetup.participants.username}</p> */}
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
