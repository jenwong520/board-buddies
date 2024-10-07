steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE player_tags (
            player_id VARCHAR(100) REFERENCES players(player_id) ON DELETE CASCADE,
            tag_id INT REFERENCES tags(tag_id) ON DELETE CASCADE,
            PRIMARY KEY (player_id, tag_id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE tags;
        """
    ],
]
