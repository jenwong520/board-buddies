steps = [
    [
        ## Create the table
        """
        CREATE TABLE meetups (
            id SERIAL PRIMARY KEY NOT NULL,
            meetup_name VARCHAR(70) NOT NULL,
            organizer_id VARCHAR NOT NULL REFERENCES players(player_id) ON DELETE SET NULL,
            game_id INT NOT NULL REFERENCES games(id) ON DELETE SET NULL,
            location_id INT NOT NULL REFERENCES locations(id) ON DELETE SET NULL,
            meetup_date TIMESTAMP NOT NULL,
            description TEXT,
            min_players SMALLINT NOT NULL,
            max_players SMALLINT NOT NULL,
            status VARCHAR(25) NOT NULL DEFAULT 'scheduled'
        );
        """,
        ## Drop the table
        """
        DROP TABLE meetups;
        """
    ],
]
