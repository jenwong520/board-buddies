steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE users (
            user_id VARCHAR(100) NOT NULL UNIQUE,
            PRIMARY KEY (user_id),
            username VARCHAR(25) NOT NULL UNIQUE,
            password VARCHAR(100) NOT NULL,
            is_developer BOOLEAN DEFAULT FALSE,
            is_player BOOLEAN DEFAULT FALSE,
            date_joined TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE users;
        """
    ],
]
