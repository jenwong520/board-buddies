"""
Database Queries for Players
"""
import logging
import os
import psycopg
from psycopg_pool import ConnectionPool
from typing import Optional, List
from models.players import (
    PlayerIn,
    PlayerOut,
    Error
)
from utils.exceptions import UserDatabaseException
from uuid import uuid4

logging.basicConfig(level=logging.ERROR)


# Setting up the connection pool
DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

pool = ConnectionPool(DATABASE_URL)


def create_uuid_for_new_user():
    user_id = str(uuid4())
    return user_id


uid = create_uuid_for_new_user()


class PlayerQueries:
    """
    Class containing queries for the players table
    """

    def player_in_to_out(self, player: PlayerIn, user_id: str) -> PlayerOut:
        old_data = player.dict()
        return PlayerOut(user_id=user_id, **old_data)

    def convert_to_record(self, record):
        return PlayerOut(
            user_id=record[0],
            email=record[1],
            age=record[2],
            city=record[3],
            state=record[4],
            tags=record[5],
            is_verified=record[6],
            is_gamehost=record[7],
            gamehost_id=record[8],
            is_playtester=record[9],
            playtester_id=record[10],
            lat=record[11],
            lon=record[12],
            location_radius=record[13]
        )

    def create_player(self, player: PlayerIn, user_id: str) -> PlayerOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        INSERT INTO players (
                            player_id,
                            email,
                            age,
                            city,
                            state,
                            tags,
                            is_verified,
                            is_gamehost,
                            gamehost_id,
                            is_playtester,
                            playtester_id,
                            lat,
                            lon,
                            location_radius
                        ) VALUES (
                            %s, %s, %s, %s, %s, %s, %s,
                            %s, %s, %s, %s, %s, %s, %s
                        )
                        RETURNING player_id;
                        """,
                        [
                            user_id,
                            player.email,
                            player.age,
                            player.city,
                            player.state,
                            player.tags,
                            player.is_verified,
                            player.is_gamehost,
                            player.gamehost_id,
                            player.is_playtester,
                            player.playtester_id,
                            player.lat,
                            player.lon,
                            player.location_radius

                        ]
                    )
                    player_id = cur.fetchone()[0]
                    return self.player_in_to_out(player, player_id)
        except psycopg.Error as e:
            raise UserDatabaseException(f"Could not create player: {e}")

    def get_all(self) -> Optional[List[PlayerOut]]:
        """
        Gets a list of all players' usernames and IDs
        """
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT players.*, users.username
                        FROM players
                        INNER JOIN users
                            ON (users.user_id = players.player_id)
                        ORDER BY username;
                        """
                    )
                    rows = cur.fetchall()
                    return [self.convert_to_record(row) for row in rows]
        except Exception as e:
            logging.error(f"Error fetching players: {e}")
            raise UserDatabaseException("Could not retrieve players")

    def update(
            self,
            player_id: str,
            player: PlayerIn,
            user_id: str
            ) -> PlayerOut:
        """
        Updates a player's details in the database
        """
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        UPDATE players
                        SET email = %s,
                            age = %s,
                            city = %s,
                            state = %s,
                            tags = %s,
                            is_verified = %s,
                            is_gamehost = %s,
                            gamehost_id = %s,
                            is_playtester = %s,
                            playtester_id = %s,
                            lat = %s,
                            lon = %s,
                            location_radius = %s
                        WHERE player_id = %s
                        """,
                        [
                            player.email,
                            player.age,
                            player.city,
                            player.state,
                            player.tags,
                            player.is_verified,
                            player.is_gamehost,
                            player.gamehost_id,
                            player.is_playtester,
                            player.playtester_id,
                            player.lat,
                            player.lon,
                            player.location_radius,
                            player_id
                        ]
                    )
                    if cur.rowcount == 0:
                        return None
                    return self.player_in_to_out(player, user_id)
        except psycopg.Error as e:
            print(e)
            return Error(message=f"Could not update: {e}")

    def delete(self, player_id: str) -> bool:
        """
        Deletes a player from the database
        """
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM players
                        WHERE player_id = %s
                        """,
                        [player_id]
                    )
                    if cur.rowcount == 0:
                        return False
                    return True
        except Exception as e:
            logging.error(f"Error deleting player: {e}")
            return False

    def details(self, player_id: str) -> Optional[PlayerOut]:
        """
        Gets details of a specific player by ID
        """
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT *
                        FROM players
                        WHERE player_id = %s
                        """,
                        [player_id]
                    )
                    record = cur.fetchone()
                    if not record:
                        return None
                    return self.convert_to_record(record)
        except Exception as e:
            logging.error(
                f"Error fetching player details: {e}"
            )
            raise UserDatabaseException(f"Could not retrieve player details")
