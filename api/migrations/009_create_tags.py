steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE tags (
            tag_id SERIAL PRIMARY KEY,
            tag_name VARCHAR(255) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE tags;
        """
    ],
]
