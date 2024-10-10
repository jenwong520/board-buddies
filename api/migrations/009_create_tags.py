steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE tags (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(100) NOT NULL UNIQUE
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE tags;
        """
    ],
]
