"""
Database Queries for Location
"""

import os
from psycopg_pool import ConnectionPool
from typing import Optional, List
from models.meetups import (
    MeetupIn,
    MeetupOut
)
from utils.exceptions import UserDatabaseException

DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

pool = ConnectionPool(DATABASE_URL)


class MeetupQueries:
    """
    Class containing queries for the meetups table
    """
    def meetup_in_out(self, id: int, meetup: MeetupIn) -> MeetupOut:
        old_data = meetup.dict()
        return MeetupOut(id=id, **old_data)

    def create(self, meetup: MeetupIn) -> MeetupOut:
        """
        Creates Meetup in the database

        Raises an Meetup insertion exception if createing the Meetup fails
        """
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        INSERT INTO meetups (
                        time,
                        description,
                        min_players,
                        max_players,
                        completed
                        ) Values (
                            %s, %s, %s, %s, %s
                        )
                        RETURNING id;
                        """,
                        [
                            meetup.time,
                            meetup.description,
                            meetup.min_players,
                            meetup.max_players,
                            meetup.completed
                        ]
                    )
                    id = result.fetchone()[0]
                    return self.meetup_in_out(id, meetup)

        except Exception as e:
            print(e)
            return{"message": "could not create meetup in database"}
