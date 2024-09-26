import { useEffect, useState } from 'react';
import useAuthService from '../../hooks/useAuthService'
import { useParams } from 'react-router-dom';
import Nav from '../Nav';

function MeetupDetail() {
    const { id } = useParams();
    const { user } = useAuthService();
    const [meetup, setMeetup] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isParticipant, setIsParticipant] = useState(false);

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
    }, []);

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

    return (
        <>
            <Nav />
            <div>
                <header
                    className="detail-header"
                    style={{
                        backgroundImage: `url(${meetup.game_image})`,
                    }}
                >
                </header>

                <div className="details-container">
                    <h1>{meetup.game_name}</h1>
                    <p><strong>Organizer:</strong> {meetup.organizer_username}</p>
                    <p><strong>Date and Time:</strong> {new Date(meetup.meetup_date).toLocaleString()}</p>
                    <p><strong>Location:</strong> {meetup.location_name}, {meetup.location_address}, {meetup.location_city}, {meetup.location_state}</p>
                    <p><strong>Store Type:</strong> {meetup.location_store_type}</p>
                    <p><strong>Description:</strong> {meetup.description}</p>
                    <p><strong>Players:</strong> {meetup.min_players} - {meetup.max_players}</p>
                </div>

                <div>
                    {user && meetup.organizer_id !== user.user_id && (
                        <>
                            {isParticipant && (
                                <button onClick={handleLeave}>Leave Meetup</button>
                            )} {!isParticipant && (
                                <button onClick={handleJoin}>Join Meetup</button>
                            )}
                        </>
                    )}
                </div>

                <div className="details-container">
                    <h2>Participants</h2>
                    {participants.length > 0 ? (
                        <ul>
                            {participants.map((participant) => (
                                <p key={participant.participant_id}>
                                    {participant.username}
                                </p>
                            ))}
                        </ul>
                    ) : (
                        <p>No participants have joined yet.</p>
                    )}
                </div>

            </div>
        </>
    );
}

export default MeetupDetail;
