import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

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
            <h1>Games</h1>
            <div className="game-list">

            {games.map((game) => (
                <table key={game.id} className="game-detail">
                    <div className="game-background" style={{backgroundImage: `url(${game.game_image})`}}>
                        <div>
                            <p>{game.name}</p>
                            <p>Age {game.min_age} - {game.max_age}</p>
                            <p>Players:{game.min_players} - {game.max_players}</p>
                            <p>Duration: {game.game_duration} minutes</p>
                        </div>
                    </div>
                </table>
            ))}

            </div>
        </>
    );
};

export default GameList;
