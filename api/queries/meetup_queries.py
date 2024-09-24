"""
Database Queries for Location
"""

import os
import psycopg
from psycopg_pool import ConnectionPool
from typing import Optional, List, Union
from models.meetups import (
    MeetupIn,
    MeetupOut,
    Error
)

DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

pool = ConnectionPool(DATABASE_URL)


class MeetupQueries:
    """
    Class containing queries for the meetups table
    """
    def meetup_in_to_out(self, meetup: MeetupIn, id: int, organizer_id: str) -> MeetupOut:
        old_data = meetup.dict()
        return MeetupOut(id=id, organizer_id=organizer_id, **old_data)

    def convert_to_record(self, record) -> MeetupOut:
        return MeetupOut(
            id=record[0],
            organizer_id=record[1],
            game_id=record[2],
            location_id=record[3],
            meetup_date=record[4],
            description=record[5],
            min_players=record[6],
            max_players=record[7],
            status=record[8]
        )

    def get_all(self) -> Union[Error, List[MeetupOut]]:
        """
        Gets a list of all the meetups
        """
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT *
                        FROM meetups
                        ORDER BY meetup_date;
                        """
                    )
                    records = cur.fetchall()
                    return [self.convert_to_record(record) for record in records]  # noqa

        except Exception as e:
            print(e)
            return {"message": "Could not get list of meetups"}

    def create(self, meetup: MeetupIn, organizer_id: str) -> MeetupOut:
        """
        Creates meetup in the database.
        Associates meetup with authenticated user (organizer).
        Raises a meetup insertion exception if createing the Meetup fails.
        """
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        INSERT INTO meetups (
                            organizer_id,
                            game_id,
                            location_id,
                            meetup_date,
                            description,
                            min_players,
                            max_players,
                            status
                        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            organizer_id,
                            meetup.game_id,
                            meetup.location_id,
                            meetup.meetup_date,
                            meetup.description,
                            meetup.min_players,
                            meetup.max_players,
                            meetup.status or 'scheduled'
                        ]
                    )
                    meetup_id = cur.fetchone()[0]
                    return self.meetup_in_to_out(meetup, meetup_id, organizer_id)

        except Exception as e:
            print(e)
            return {"message": "Could not create meetup in database"}

    def details(self, meetup_id: int) -> Optional[MeetupOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT *
                        FROM meetups
                        WHERE id = %s
                        """,
                        [meetup_id]
                    )
                    record = cur.fetchone()
                    if record:
                        return self.convert_to_record(record)
                    return None
        except Exception as e:
            print(e)
            return {"message": "Could not get meetup details"}

    def update(
            self,
            meetup_id: int,
            meetup: MeetupIn,
            organizer_id: str
    ) -> Union[MeetupOut, Error]:
        """
        Updates the details of a specific meetup if the user is the host.
        Only accessible by logged-in user who created the meetup (organizer).
        """
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        UPDATE meetups
                        SET game_id = %s,
                            location_id = %s,
                            meetup_date = %s,
                            description = %s,
                            min_players = %s,
                            max_players = %s,
                            status = %s
                        WHERE id = %s AND organizer_id = %s
                        RETURNING id
                        , organizer_id
                        , game_id
                        , location_id
                        , meetup_date
                        , description
                        , min_players
                        , max_players
                        , status;
                        """,
                        [
                            meetup.game_id,
                            meetup.location_id,
                            meetup.meetup_date,
                            meetup.description,
                            meetup.min_players,
                            meetup.max_players,
                            meetup.status,
                            meetup_id,
                            organizer_id
                        ]
                    )
                    if cur.rowcount == 0:
                        return None
                    record = cur.fetchone()
                    if record:
                        return self.convert_to_record(record)
                    else:
                        return Error(message="Meetup not found or not authorized to update")  # noqa

        except psycopg.Error as e:
            print(e)
            return Error(message="Could not update meetup")

    def delete(self, meetup_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM meetups
                        WHERE id = %s
                        """,
                        [meetup_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def check_if_participant(self, meetup_id: int, participant_id: str) -> bool:
        """
        Checks if the user is already a participant in the meetup.
        """
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT 1 FROM meetup_participants
                        WHERE meetup_id = %s AND participant_id = %s
                        """,
                        [meetup_id, participant_id]
                    )
                    return cur.fetchone() is not None
        except Exception as e:
            print(e)
            return False

    def check_if_organizer(self, meetup_id: int, organizer_id: str) -> bool:
        """
        Checks if the logged-in user is the organizer of the meetup.
        """
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT 1 FROM meetups
                        WHERE id = %s AND organizer_id = %s
                        """,
                        [meetup_id, organizer_id]
                    )
                    return cur.fetchone() is not None
        except Exception as e:
            print(e)
            return False

    def join_meetup(self, meetup_id: int, participant_id: str) -> bool:
        """
        Adds a participant to the meetup if they are not the organizer
        """
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT organizer_id
                        FROM meetups
                        WHERE id = %s;
                        """,
                        [meetup_id]
                    )
                    organizer_id = cur.fetchone()[0]

                    if organizer_id == participant_id:
                        return Error(message="You cannot join a meetup you organized.")

                    cur.execute(
                        """
                        SELECT 1 FROM meetup_participants
                        WHERE meetup_id = %s AND participant_id = %s
                        """,
                        [meetup_id, participant_id]
                    )
                    if cur.fetchone():
                        return Error(message="You are already a participant in this meetup.")

                    cur.execute(
                        """
                        INSERT INTO meetup_participants (participant_id,meetup_id)
                        VALUES (%s, %s);
                        """,
                        [participant_id, meetup_id]
                    )
                    return {"message": "Successfully joined the meetup"}

        except Exception as e:
            print(e)
            return Error(message="Could not join the meetup.")

    def leave_meetup(self, meetup_id: int, participant_id: str) -> bool:
        """
        Removes a participant from the meetup.
        """
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM meetup_participants
                        WHERE meetup_id = %s AND participant_id = %s
                        """,
                        [meetup_id, participant_id]
                    )
                    return cur.rowcount > 0
        except Exception as e:
            print(e)
            return False
