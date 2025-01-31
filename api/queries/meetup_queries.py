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
    def meetup_in_to_out(
            self,
            meetup: MeetupIn,
            id: int,
            organizer_id: str
    ) -> MeetupOut:
        old_data = meetup.dict()
        return MeetupOut(id=id, organizer_id=organizer_id, **old_data)

    def convert_to_record(self, record) -> MeetupOut:
        return MeetupOut(
            id=record[0],
            meetup_name=record[1],
            organizer_id=record[2],
            organizer_username=record[3],
            organizer_picture=record[4],
            game_id=record[5],
            game_name=record[6],
            game_image=record[7],
            location_id=record[8],
            location_name=record[9],
            location_address=record[10],
            location_city=record[11],
            location_state=record[12],
            location_store_type=record[13],
            start_time=record[14],
            end_time=record[15],
            description=record[16],
            min_players=record[17],
            max_players=record[18],
            status=record[19],
        )

    def get_all(self) -> Union[Error, List[dict]]:
        """
        Gets a list of all the meetups along with participants' usernames.
        """
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT
                            m.id,
                            m.meetup_name,
                            m.organizer_id,
                            u.username AS organizer_username,
                            p.profile_picture AS organizer_picture,
                            g.id AS game_id,
                            g.name AS game_name,
                            g.game_image AS game_image,
                            l.id AS location_id,
                            l.name AS location_name,
                            l.address AS location_address,
                            l.city AS location_city,
                            l.state AS location_state,
                            l.store_type AS location_store_type,
                            m.start_time,
                            m.end_time,
                            m.description,
                            m.min_players,
                            m.max_players,
                            m.status
                        FROM meetups m
                        JOIN players p ON m.organizer_id = p.player_id
                        JOIN games g ON m.game_id = g.id
                        JOIN locations l ON m.location_id = l.id
                        JOIN users u ON m.organizer_id = u.user_id
                        ORDER BY m.start_time;
                        """
                    )
                    meetups = cur.fetchall()
                    meetup_list = []

                    for meetup in meetups:
                        cur.execute(
                            """
                            SELECT
                            p.player_id,
                            u.username,
                            COALESCE(p.profile_picture, '') AS profile_picture
                            FROM meetup_participants mp
                            JOIN players p ON mp.participant_id = p.player_id
                            JOIN users u ON u.user_id = p.player_id
                            WHERE mp.meetup_id = %s
                            """,
                            [meetup[0]]
                        )
                        participants = cur.fetchall()

                        meetup_list.append({
                            "meetup": self.convert_to_record(meetup),
                            "participants": [
                                {
                                    "participant_id": participant[0],
                                    "username": participant[1],
                                    "profile_picture": participant[2]
                                }
                                for participant in participants
                            ]
                        })
                    return meetup_list
        except Exception as e:
            print(e)
            return {"message": "Could not get list of meetups"}

    def create(
            self,
            meetup: MeetupIn,
            organizer_id: str
    ) -> Union[MeetupOut, Error]:
        """
        Creates meetup in the database.
        Associates meetup with authenticated user (organizer).
        Raises a meetup insertion exception if creating the meetup fails.
        """
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        INSERT INTO meetups (
                            meetup_name,
                            organizer_id,
                            game_id,
                            location_id,
                            start_time,
                            end_time,
                            description,
                            min_players,
                            max_players,
                            status
                        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            meetup.meetup_name,
                            organizer_id,
                            meetup.game_id,
                            meetup.location_id,
                            meetup.start_time,
                            meetup.end_time,
                            meetup.description,
                            meetup.min_players,
                            meetup.max_players,
                            meetup.status or 'scheduled'
                        ]
                    )
                    result = cur.fetchone()
                    if result is None:
                        return Error(
                            message="Could not create meetup in database"
                        )

                    meetup_id = result[0]

                    cur.execute(
                        """
                        SELECT
                            m.id,
                            m.meetup_name,
                            m.organizer_id,
                            p.profile_picture AS organizer_picture,
                            u.username AS organizer_username,
                            g.id AS game_id,
                            g.name AS game_name,
                            g.game_image AS game_image,
                            l.id AS location_id,
                            l.name AS location_name,
                            l.address AS location_address,
                            l.city AS location_city,
                            l.state AS location_state,
                            l.store_type AS location_store_type,
                            m.start_time,
                            m.end_time,
                            m.description,
                            m.min_players,
                            m.max_players,
                            m.status
                        FROM meetups m
                        JOIN players p ON m.organizer_id = p.player_id
                        JOIN games g ON m.game_id = g.id
                        JOIN locations l ON m.location_id = l.id
                        JOIN users u ON m.organizer_id = u.user_id
                        WHERE m.id = %s
                        """,
                        [meetup_id]
                    )

                    meetup_record = cur.fetchone()
                    print(meetup_record)
                    if meetup_record:
                        return self.convert_to_record(meetup_record)
                    else:
                        return Error(
                            message="Meetup created but could not retrieve details"  # noqa
                        )

        except Exception as e:
            print(e)
            return {"message": "Could not create meetup in database"}

    def details(self, meetup_id: int) -> Optional[dict]:
        """
        Retrieves the details of a specific meetup along with participants.
        Includes game details, location details, organizer's username.
        """
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT
                            m.id,
                            m.meetup_name,
                            m.organizer_id,
                            u.username AS organizer_username,
                            p.profile_picture AS organizer_picture,
                            g.id AS game_id,
                            g.name AS game_name,
                            g.game_image AS game_image,
                            l.id AS location_id,
                            l.name AS location_name,
                            l.address AS location_address,
                            l.city AS location_city,
                            l.state AS location_state,
                            l.store_type AS location_store_type,
                            m.start_time,
                            m.end_time,
                            m.description,
                            m.min_players,
                            m.max_players,
                            m.status
                        FROM meetups m
                        JOIN players p ON m.organizer_id = p.player_id
                        JOIN games g ON m.game_id = g.id
                        JOIN locations l ON m.location_id = l.id
                        JOIN users u ON m.organizer_id = u.user_id
                        WHERE m.id = %s
                        """,
                        [meetup_id]
                    )

                    meetup_record = cur.fetchone()
                    if not meetup_record:
                        return None

                    cur.execute(
                        """
                        SELECT
                            p.player_id,
                            u.username,
                            COALESCE(p.profile_picture, '') AS profile_picture
                        FROM meetup_participants mp
                        JOIN players p ON mp.participant_id = p.player_id
                        JOIN users u ON u.user_id = p.player_id
                        WHERE mp.meetup_id = %s
                        """,
                        [meetup_id]
                    )
                    participants = cur.fetchall()

                    return {
                        "meetup": self.convert_to_record(meetup_record),
                        "participants": [
                            {
                                "participant_id": participant[0],
                                "username": participant[1],
                                "profile_picture": participant[2]
                            }
                            for participant in participants
                        ],
                    }

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
                        SET meetup_name = %s,
                            game_id = %s,
                            location_id = %s,
                            start_time = %s,
                            end_time = %s,
                            description = %s,
                            min_players = %s,
                            max_players = %s,
                            status = %s
                        WHERE id = %s AND organizer_id = %s
                        RETURNING id;
                        """,
                        [
                            meetup.meetup_name,
                            meetup.game_id,
                            meetup.location_id,
                            meetup.start_time,
                            meetup.end_time,
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

                    cur.execute(
                        """
                        SELECT
                            m.id,
                            m.meetup_name,
                            m.organizer_id,
                            u.username AS organizer_name,
                            p.profile_picture AS organizer_picture,
                            g.id AS game_id,
                            g.name AS game_name,
                            g.game_image AS game_image,
                            l.id AS location_id,
                            l.name AS location_name,
                            l.address AS location_address,
                            l.city AS location_city,
                            l.state AS location_state,
                            l.store_type AS location_store_type,
                            m.start_time,
                            m.end_time,
                            m.description,
                            m.min_players,
                            m.max_players,
                            m.status
                        FROM meetups m
                        JOIN players p ON m.organizer_id = p.player_id
                        JOIN games g ON m.game_id = g.id
                        JOIN locations l ON m.location_id = l.id
                        JOIN users u ON m.organizer_id = u.user_id
                        WHERE m.id = %s
                        """,
                        [meetup_id]
                    )

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

    def check_if_participant(
            self,
            meetup_id: int,
            participant_id: str
    ) -> bool:
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

    def join_meetup(
            self,
            meetup_id: int,
            participant_id: str
    ) -> Union[bool, Error]:
        """
        Adds a participant to a meetup.
        Checks that max players limit has not been reached.
        """
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT max_players
                        FROM meetups
                        WHERE id = %s;
                        """,
                        [meetup_id]
                    )
                    result = cur.fetchone()
                    if not result:
                        return Error(message="Meetup not found")
                    max_players = result[0]

                    cur.execute(
                        """
                        SELECT COUNT(*)
                        FROM meetup_participants
                        WHERE meetup_id = %s
                        """,
                        [meetup_id]
                    )
                    current_participants = cur.fetchone()[0]
                    if current_participants >= max_players:
                        return Error(
                            message="This meetup has reached the maximum number of participants"  # noqa
                        )

                    cur.execute(
                        """
                        SELECT 1 FROM meetup_participants
                        WHERE meetup_id = %s AND participant_id = %s
                        """,
                        [meetup_id, participant_id]
                    )
                    if cur.fetchone():
                        return Error(
                            message="You are already a participant in this meetup"  # noqa
                        )

                    cur.execute(
                        """
                        INSERT INTO meetup_participants (
                        participant_id,
                        meetup_id
                        ) VALUES (%s, %s);
                        """,
                        [participant_id, meetup_id]
                    )

                    if cur.rowcount == 0:
                        return Error(
                            message="Failed to add participant to the meetup"
                        )

                    return {"message": "Successfully joined the meetup"}

        except Exception as e:
            print(e)
            return Error(message="Could not join the meetup")

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
