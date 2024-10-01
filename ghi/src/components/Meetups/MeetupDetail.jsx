import { useEffect, useState } from 'react';
import useAuthService from '../../hooks/useAuthService'
import { useParams } from 'react-router-dom';
import Nav from '../Nav';
import testImage from "../../img/player-icons/board-buddies-icon-shiba.png"

function MeetupDetail() {
    const { id } = useParams();
    const { user } = useAuthService();
    const [meetup, setMeetup] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isParticipant, setIsParticipant] = useState(false);
    console.log("P", participants)
    console.log("U", user)

    useEffect(() => {
        fetch(`http://localhost:8000/api/meetup/${id}`)
        .then((response) => response.json())
        .then((data) => {
            setMeetup(data.meetup);
            setParticipants(data.participants);
            setLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching meetup details:', error);
            setLoading(false);
        });
    }, [id]);

    useEffect(() => {
        if (user && participants.length > 0) {
            for (let p of participants) {
                if (p.participant_id === user.user_id) {
                    setIsParticipant(true);
                    break;
                }
            }
        } else {
            setIsParticipant(false);
        }
    }, [participants, user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!meetup) {
        return <div>Meetup not found</div>;
    }

    const handleJoin = () => {
        fetch(`http://localhost:8000/api/meetup/${id}/join`, {
            method: 'POST',
            credentials: 'include'
        })
            .then((response) => {
                if (response.ok) {
                    const newParticipant = { participant_id: user.user_id, username: user.username };
                    setParticipants([...participants, newParticipant]);
                    setIsParticipant(true);
                } else {
                    console.error('Failed to join the meetup');
                }
            })
            .catch((error) => {
                console.error('Error joining meetup:', error);
            });
    };

    const handleLeave = () => {
        fetch(`http://localhost:8000/api/meetup/${id}/leave`, {
            method: 'DELETE',
            credentials: 'include'
        })
            .then((response) => {
                if (response.ok) {
                    setParticipants(participants.filter(participant => participant.participant_id !== user.user_id));
                    setIsParticipant(false);
                } else {
                    console.error('Failed to leave the meetup');
                }
            })
            .catch((error) => {
                console.error('Error leaving meetup:', error);
            });
    };

    const name = String(meetup.location_name)
    const city = String(meetup.location_city)
    const convertedName = name.split(' ').join('+')
    const convertedCity = city.split(' ').join('+')
    const mapsUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyCdG1XCUBYkXysiPi1E8cc6UqCR8OvRW5M&q=${convertedName},${convertedCity}+${meetup.state}`
    return (
        <>
            <Nav />
            <div className='container row'>
                <header
                    className="detail-header rounded mb-5"
                    style={{
                        backgroundImage: `url(${meetup.game_image})`,
                    }}
                >
                </header>



                <div className="details-container ">
                    <h2>Participants</h2>
                    {participants.length > 0 ? (
                        <div className='row'>
                            {participants.map((participant) => (
                                <div className='col-3 m-3' key={participant.participant_id}>
                                    <img className='img-fluid rounded-circle' src={testImage}/>
                                    <p>{participant.username}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No participants have joined yet.</p>
                    )}
                    <div>
                    {user && meetup.organizer_id !== user.user_id && (
                        <>
                            {!isParticipant && (
                                <button className='btn btn-info' onClick={handleJoin}>Join Meetup</button>
                            )} {isParticipant && (
                                <button className='btn btn-danger' onClick={handleLeave}>Leave Meetup</button>
                            )}
                        </>
                    )}
                </div>
                </div>

                <div className="details-container">
                <h1>{meetup.game_name}</h1>
                <p><strong>Organizer:</strong> {meetup.organizer_username}</p>
                <p><strong>Date and Time:</strong> {new Date(meetup.meetup_date).toLocaleString()}</p>
                <p><strong>Details:</strong> <br />
                    {meetup.description}</p>
                <p><strong>Players Needed:</strong> {meetup.min_players} - {meetup.max_players}</p>
                </div>

                <div className='details-container'>
                    <h1>Location</h1>
                    <p><strong>{meetup.location_name}</strong><br />
                    {meetup.location_address} {meetup.location_city}, {meetup.location_state}</p>
                    <iframe
                    height="450"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={mapsUrl}
                    className='col-12'
                    ></iframe>
                </div>

            </div>
        </>
    );
}

export default MeetupDetail;
