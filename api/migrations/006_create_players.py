steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE players (
            player_id VARCHAR (100) NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
            PRIMARY KEY (player_id),
            email VARCHAR(255) UNIQUE,
            age SMALLINT,
            city VARCHAR(100),
            state VARCHAR(2),
            tags VARCHAR(50),
            is_verified BOOLEAN DEFAULT FALSE,
            is_gamehost BOOLEAN DEFAULT FALSE,
            gamehost_id INTEGER,
            is_playtester BOOLEAN DEFAULT FALSE,
            playtester_id INTEGER,
            lat FLOAT,
            lon FLOAT,
            location_radius SMALLINT

        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE players;
        """
    ],
]
