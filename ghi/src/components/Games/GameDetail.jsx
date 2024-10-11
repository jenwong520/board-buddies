import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Nav from '../Nav'

function GameDetail() {
    const { id } = useParams()
    const [game, setGame] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`http://localhost:8000/api/game/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setGame(data)
                setLoading(false)
            })
            .catch((error) => {
                console.error('Error fetching game details:', error)
                setLoading(false)
            })
    }, [id])

    if (loading) {
        return <div>Loading...</div>
    }

    if (!game) {
        return <div>Game not found</div>
    }

    return (
        <>
            <Nav />
            <div>
                <header
                    className="detail-header"
                    style={{
                        backgroundImage: `url(${game.game_image})`,
                    }}
                ></header>

                <div className="details-container">
                    <h1>{game.name}</h1>
                    <p>
                        <strong>Players:</strong>{' '}
                        {game.max_players === 0
                            ? `${game.min_players}+`
                            : `${game.min_players} - ${game.max_players}`}
                    </p>
                    <p>
                        <strong>Duration:</strong> {game.game_duration} minutes
                    </p>
                    <p>
                        <strong>Age Range:</strong>{' '}
                        {game.max_age === 0
                            ? `${game.min_age}+`
                            : `${game.min_age} - ${game.max_age}`}
                    </p>
                    <p>
                        <strong>Tags:</strong>{' '}
                        {game.tags.map((tag) => (
                            <button
                                className="btn button-primary m-1"
                                style={{
                                    backgroundColor: 'rgba(30, 30, 30, 0.7)',
                                    color: 'white',
                                }}
                                key={tag.id}
                            >
                                {tag.name}{' '}
                            </button>
                        ))}
                    </p>

                    <p>
                        <strong>Description:</strong> {game.description}
                    </p>
                </div>
            </div>
        </>
    )
}

export default GameDetail
