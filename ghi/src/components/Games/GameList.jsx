import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Nav from '../Nav';

function GameList() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/game/')
            .then((response) => response.json())
            .then((data) => setGames(data))
            .catch((error) => console.error('Error fetching games:', error));
    }, []);

    return (
        <>
            <Nav />
            <div className='container '>
                <h1 style={{padding:"10px"}}>Games List</h1>
                <div className="game-list">
                    {games.length > 0 ? (
                        games.map((game) => (
                            <Link to={`/game/${game.id}`} key={game.id} className="game-item">
                                <div
                                    className="game-background"
                                    style={{ backgroundImage: `url(${game.game_image})`}}
                                >
                                    <div className="game-details">
                                        <h4 className="mt-5">{game.name}</h4>
                                        <p>Age: {game.max_age === 0 ? (
                                            `${game.min_age}+`
                                            ) : (
                                                `${game.min_age} - ${game.max_age}`
                                            )}</p>
                                        <p>Players: {game.max_players === 0 ? (
                                            `${game.min_players}+`
                                            ) : (
                                                `${game.min_players} - ${game.max_players}`
                                            )}</p>
                                        <p>Duration: {game.game_duration} minutes</p>
                                    </div>
                                    
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p>Games coming soon!</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default GameList;
