steps = [
    [
        # Create Players Table
        """
        CREATE TABLE players (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) NOT NULL UNIQUE,
            age SMALLINT NOT NULL,
            city VARCHAR(100) NOT NULL,
            state VARCHAR(100) NOT NULL,
            tags VARCHAR(255)
        );
        """,
        # Drop Table
        """
        DROP TABLE players;
        """
    ],
]
