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
    console.log("M", meetup)

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
                return fetch(`http://localhost:8000/api/players/${user.user_id}`);
            } else {
                console.error('Failed to join the meetup');
            }
        })
        .then((response) => {
            if (response && response.ok) {
                return response.json();
            } else {
                console.error('Failed to fetch player profile');
            }
        })
        .then((playerData) => {
            if (playerData) {
                const newParticipant = {
                    participant_id: user.user_id,
                    username: user.username,
                    profile_picture: playerData.profile_picture
                };

                setParticipants(prevParticipants => [...prevParticipants, newParticipant]);
                setIsParticipant(true);
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

    const handleOrganizerJoin = () => {
        fetch(`http://localhost:8000/api/meetup/${id}/join`, {
            method: 'POST',
            credentials: 'include'
        })
            .then((response) => {
                if (response.ok) {
                    return fetch(`http://localhost:8000/api/players/${user.user_id}`);
                } else {
                    console.error('Failed to join the meetup');
                }
            })
            .then((response) => {
                if (response && response.ok) {
                    return response.json();
                } else {
                    console.error('Failed to fetch player profile');
                }
            })
            .then((playerData) => {
                if (playerData) {
                    const newParticipant = {
                        participant_id: user.user_id,
                        username: user.username,
                        profile_picture: playerData.profile_picture
                    };
                    setParticipants(prevParticipants => [...prevParticipants, newParticipant]);
                    setOrganizerJoin(true);
                }
            })
            .catch((error) => {
                console.error('Error joining meetup as organizer:', error);
            });
    };

    const handleOrganizerLeave = () => {
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
                    <h1><strong>{meetup.meetup_name}</strong></h1>
                    <h2>Game: {meetup.game_name}</h2>
                    <p>
                        <img
                            src={`${meetup.organizer_picture}.png`}
                            alt="Organizer"
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                marginRight: '10px',
                                verticalAlign: 'middle'
                            }}
                            />
                            Organized by {meetup.organizer_username}</p>
                    <p><strong>Start:</strong><br />
                        {new Date(meetup.start_time).toLocaleString([], {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}</p>
                    <p><strong>End:</strong><br />
                        {new Date(meetup.end_time).toLocaleString([], {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}</p>
                    <p><strong>Location:</strong><br />
                        {meetup.location_name} <br />
                        {meetup.location_address} <br />
                        {meetup.location_city}, {meetup.location_state}</p>
                    <p><strong>Details:</strong> <br />
                        {meetup.description}</p>
                    <p><strong>Players Needed:</strong> {meetup.min_players} - {meetup.max_players}</p>
                </div>

                <div>
                    {!isParticipant && user && meetup.organizer_id === user.user_id && (
                        <button onClick={handleOrganizerJoin}>Join as Participant</button>
                    )}
                    {isParticipant && user && meetup.organizer_id === user.user_id && (
                        <button onClick={handleOrganizerLeave}>Leave as Participant</button>
                    )}
                    {user && meetup.organizer_id !== user.user_id && (
                        <>
                            {!isParticipant && (
                                <button onClick={handleJoin}>Join Meetup</button>
                            )} {isParticipant && (
                                <button onClick={handleLeave}>Leave Meetup</button>
                            )}
                        </>
                    )}
                </div>

                <div className="details-container">
                    <h2>Participants</h2>
                    {participants.length > 0 ? (
                        <div className="row" style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {participants.map((participant) => (
                                <div
                                    key={participant.participant_id}
                                    className="col-4 d-flex flex-column align-items-center"
                                    style={{ marginBottom: '20px' }}
                                >
                                    <img
                                        className="rounded-circle"
                                        src={`${participant.profile_picture}.png`}
                                        alt=""
                                        style={{ width: '100px', height: '100px', objectFit: 'cover', marginBottom: '10px' }}
                                    />
                                    <p style={{ textAlign: 'center', fontSize: '14px', wordWrap: 'break-word' }}>
                                        {participant.username}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No participants have joined yet.</p>
                    )}
                </div>


            </div>
        </>
    );
}

export default MeetupDetail;
