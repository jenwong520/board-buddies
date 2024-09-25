import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Nav from '../Nav';  // Assuming you have a Nav component for navigation

function MeetupDetail() {
    const { id } = useParams();  // Extract meetup_id from the URL parameters
    const [meetup, setMeetup] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch meetup details from the API
        fetch(`http://localhost:8000/api/meetup/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setMeetup(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching meetup details:', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!meetup) {
        return <div>Meetup not found</div>;
    }

    const gameImage = meetup.meetup.game_image || "default_image_url"; // Replace with a default image if no image is available

    return (
        <>
            <Nav />
            <div className="meetup-details-container">
                <header
                    className="meetup-header"
                    style={{
                        backgroundImage: `url(${gameImage})`,  // Use game image as background
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '300px'
                    }}
                >
                </header>

                <div className="meetup-details">
                    <h1>{meetup.meetup.game_name}</h1> {/* Display the name of the game */}
                    <p><strong>Organizer:</strong> {meetup.meetup.organizer_id}</p>
                    <p><strong>Location:</strong> {meetup.meetup.location_id}</p>
                    <p><strong>Date and Time:</strong> {new Date(meetup.meetup.meetup_date).toLocaleString()}</p>
                    <p><strong>Description:</strong> {meetup.meetup.description}</p>
                    <p><strong>Players:</strong> {meetup.meetup.min_players} - {meetup.meetup.max_players}</p>
                    <p><strong>Status:</strong> {meetup.meetup.status}</p>

                    {/* Add more details if needed */}
                </div>
            </div>
        </>
    );
}

export default MeetupDetail;
