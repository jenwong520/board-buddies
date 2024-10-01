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
                    const newParticipant = {
                        participant_id: user.user_id,
                        username: user.username,
                        profile_picture: user.profile_picture
                     };
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
                    <p><strong>Location:</strong><br />
                        {meetup.location_name} <br />
                        {meetup.location_address} <br />
                        {meetup.location_city}, {meetup.location_state}</p>
                    <p><strong>Details:</strong> <br />
                        {meetup.description}</p>
                    <p><strong>Players Needed:</strong> {meetup.min_players} - {meetup.max_players}</p>
                </div>

                <div>
                    {user && meetup.organizer_id === user.user_id && (
                        <>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={isParticipant}
                                    onChange={(e) => setIsParticipant(e.target.checked)}
                                />
                                Join as participant
                            </label>
                            {isParticipant && (
                                <button onClick={handleJoin}>Add Yourself as Participant</button>
                            )}
                        </>
                    )}
                </div>

                <div className="details-container">
                    <h2>Participants</h2>
                    {participants.length > 0 ? (
                        <ul>
                            {participants.map((participant) => (
                                <p key={participant.participant_id} style={{ display: 'flex', alignItems: 'center' }}>
                                    {participant.username}
                                    <img
                                        src={participant.profile_picture}
                                        alt={`${participant.username}'s profile`}
                                        style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }}
                                    />
                                    <span>{participant.username}</span>
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
