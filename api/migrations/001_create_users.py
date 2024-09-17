steps = [
    [
        # "Up" SQL statement
        """
        CREATE TYPE user_role AS ENUM ('player', 'game_developer', 'admin');

        CREATE TABLE users (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(25) NOT NULL UNIQUE,
            password VARCHAR(100) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            user_type user_role NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE users;
        """
    ],
]
