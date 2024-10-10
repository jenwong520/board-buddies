steps = [
    [
        ## Create the table
        """
        CREATE TABLE meetup_participants (
            participant_id VARCHAR(100) REFERENCES players(player_id) ON DELETE CASCADE,
            meetup_id INT REFERENCES meetups(id) ON DELETE CASCADE,
            joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (participant_id, meetup_id)
        );

        """,
        ## Drop the table
        """
        DROP TABLE meetup_participants;
        """
    ],
]
