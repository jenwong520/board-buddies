steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE game_tags (
            game_id INT REFERENCES games(id) ON DELETE CASCADE,
            tag_id INT REFERENCES tags(id) ON DELETE CASCADE,
            PRIMARY KEY (game_id, tag_id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE game_tags;
        """
    ],
]
