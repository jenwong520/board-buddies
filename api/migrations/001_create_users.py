steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE users (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(25) NOT NULL UNIQUE,
            password VARCHAR(25) NOT NULL,
            age SMALLINT,
            city VARCHAR(100),
            state VARCHAR(2),
            tags VARCHAR(50)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE users;
        """
    ],
]
