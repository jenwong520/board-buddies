steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE player_details (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
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
        DROP TABLE users;
        """
    ],
]
