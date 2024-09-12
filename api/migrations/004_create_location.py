steps = [
    [
        ## Create the table
        """
        CREATE TABLE locations (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(250) NOT NULL,
            city VARCHAR(250) NOT NULL,
            state VARCHAR(2) NOT NULL,
            store_type VARCHAR(250) NOT NULL
        );
        """,
        ## Drop the table
        """
        DROP TABLE locations;
        """
    ],
]
