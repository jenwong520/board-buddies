steps = [
    [
        ## Create the table
        """
        CREATE TABLE meetups (
            id SERIAL PRIMARY KEY NOT NULL,
            game_id INT REFERENCES games(id) ON DELETE SET NULL,
            location_id INT REFERENCES locations(id) ON DELETE SET NULL,
            meetup_date TIMESTAMP NOT NULL,
            description TEXT,
            min_players SMALLINT NOT NULL,
            max_players SMALLINT NOT NULL,
            is_completed BOOLEAN NOT NULL
        );
        """,
        ## Drop the table
        """
        DROP TABLE meetups;
        """
    ],
]
