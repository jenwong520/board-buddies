import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../Nav'

function MeetupsList() {
    const [meetups, setMeetups] = useState([])
    const [search, setSearch] = useState('')
    console.log('M', meetups)

    useEffect(() => {
        fetch('http://localhost:8000/api/meetup/')
            .then((response) => response.json())
            .then((data) => {
                setMeetups(data)
            })
            .catch((error) => console.error('Error fetching meetups:', error))
    }, [])

    return (
        <>
            <Nav />
            <div className="container">
                <h1 className="mt-5 text-white" style={{ padding: '30px' }}>
                    Meetups List
                </h1>
                <Link to="/meetup/create">
                    <button
                        className="btn btn-primary col-8 mb-5 "
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
                    {meetups.length > 0 ? (
                        meetups
                            .filter((game) => {
                                return search.toLowerCase() === ''
                                    ? game
                                    : game.meetup.game_name
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
                                        <div className="meetup-card">
                                            <h2 className="text-white mb-3">
                                                Players currently going to this
                                                meetup
                                            </h2>
                                            <div className="container">
                                                <div className="row">
                                                    {meetup.participants.map(
                                                        (player) => {
                                                            return (
                                                                <div
                                                                    className="col-3 "
                                                                    key={
                                                                        player.participant_id
                                                                    }
                                                                >
                                                                    <img
                                                                        className="rounded-circle img-fluid"
                                                                        src={`${player.profile_picture}`}
                                                                        alt=""
                                                                    />
                                                                    <p>
                                                                        {
                                                                            player.username
                                                                        }
                                                                    </p>
                                                                </div>
                                                            )
                                                        }
                                                    )}
                                                </div>
                                            </div>
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
    )
}

export default MeetupsList
