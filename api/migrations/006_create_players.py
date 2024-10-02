steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE players (
            player_id VARCHAR (100) NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
            PRIMARY KEY (player_id),
            profile_picture VARCHAR(250),
            email VARCHAR(255) UNIQUE,
            first_name VARCHAR(100),
            last_name VARCHAR(100),
            city VARCHAR(100),
            state VARCHAR(2),
            about_me VARCHAR(500),
            birthdate DATE,
            is_verified BOOLEAN DEFAULT FALSE,
            is_gamehost BOOLEAN DEFAULT FALSE,
            gamehost_id INTEGER,
            is_playtester BOOLEAN DEFAULT FALSE,
            playtester_id INTEGER,
            tags VARCHAR(50),
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
