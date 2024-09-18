steps = [
    [
        ## Create the table
        """
        CREATE TABLE meetups (
            id SERIAL PRIMARY KEY NOT NULL,
            time TIMESTAMP NOT NULL,
            description TEXT,
            min_players SMALLINT NOT NULL,
            max_players SMALLINT NOT NULL,
            completed BOOLEAN NOT NULL
        );
        """,
        ## Drop the table
        """
        DROP TABLE meetups;
        """
    ],
]
