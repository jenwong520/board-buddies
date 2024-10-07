import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../Nav'
import { AuthContext } from '../AuthProvider'

function MyMeetups() {
    const { user } = useContext(AuthContext)
    const [meetups, setMeetups] = useState([])
    const [myMeetups, setMyMeetups] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        const fetchMeetups = async () => {
            try {
                const response = await fetch(
                    'http://localhost:8000/api/meetup/'
                )
                const data = await response.json()
                setMeetups(data)

                const userMeetups = data.filter((meetup) => {
                    const isOrganizer =
                        meetup.meetup.organizer_id === user.user_id
                    const isParticipant = meetup.participants.some(
                        (participant) =>
                            participant.participant_id === user.user_id
                    )
                    return isOrganizer || isParticipant
                })

                setMyMeetups(userMeetups)
            } catch (error) {
                console.error('Error fetching meetups:', error)
            }
        }

        fetchMeetups()
    }, [user])

    return (
        <>
            <Nav />
            <div className="container">
                <h1 className="mt-5 text-white" style={{ padding: '30px' }}>
                    My Meetups
                </h1>
                <Link to="/meetup/create">
                    <button
                        className="btn btn-primary col-8 mb-5"
                        type="button"
                    >
                        Create a New Meetup
                    </button>
                </Link>

                <form action="">
                    <input
                        type="text"
                        placeholder="Search Meetups"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        className="form-control mb-3"
                    />
                </form>

                <div className="game-list">
                    {myMeetups.length > 0 ? (
                        myMeetups
                            .filter((meetup) => {
                                return search.toLowerCase() === ''
                                    ? meetup
                                    : meetup.meetup.meetup_name
                                          .toLowerCase()
                                          .includes(search.toLowerCase())
                            })
                            .map((meetup) => (
                                <Link
                                    to={`/meetup/${meetup.meetup.id}`}
                                    key={meetup.meetup.id}
                                    className="game-item"
                                >
                                    <div
                                        className="game-background"
                                        style={{
                                            backgroundImage: `url(${meetup.meetup.game_image})`,
                                            backgroundPosition: 'left',
                                            backgroundSize: 'cover',
                                        }}
                                    >
                                        <div className="meetup-details">
                                            <h1 className="fs-4">
                                                <strong>
                                                    {meetup.meetup.meetup_name}
                                                </strong>
                                            </h1>
                                            <p>
                                                Start:{' '}
                                                {new Date(
                                                    meetup.meetup.start_time
                                                ).toLocaleString([], {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </p>
                                            <p>
                                                End:{' '}
                                                {new Date(
                                                    meetup.meetup.end_time
                                                ).toLocaleString([], {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </p>
                                            <p className="mt-2">
                                                Game: {meetup.meetup.game_name}
                                            </p>
                                            <p className="">
                                                Organizer:{' '}
                                                {
                                                    meetup.meetup
                                                        .organizer_username
                                                }
                                            </p>
                                            <p>
                                                Players:{' '}
                                                {meetup.meetup.min_players} -{' '}
                                                {meetup.meetup.max_players}
                                                <br />
                                                Location:{' '}
                                                {meetup.meetup.location_name}
                                                <br />
                                                {
                                                    meetup.meetup.location_city
                                                },{' '}
                                                {meetup.meetup.location_state}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                    ) : (
                        <p>No meetups found.</p>
                    )}
                </div>

            </div>
        </>
    )
}

export default MyMeetups
