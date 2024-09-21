steps = [
    [
        ## CREATE THE TABLE
        """
        CREATE TABLE games (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(250) NOT NULL,
            game_image VARCHAR(1000),
            min_players SMALLINT NOT NULL,
            max_players SMALLINT NOT NULL,
            game_duration SMALLINT NOT NULL,
            min_age SMALLINT NOT NULL,
            max_age SMALLINT,
            tags VARCHAR(1000) NOT NULL,
            description TEXT
        );
        """,
        ## DROP THE TABLE
        """
        DROP TABLE games;
        """
    ],
]
