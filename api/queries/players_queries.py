"""
Database Queries for Players
"""

import os
import psycopg
from psycopg_pool import ConnectionPool
from typing import Optional, List, Union
from models.players import (
    PlayerIn,
    PlayerList,
    PlayerOut,
    Error
)
from utils.exceptions import UserDatabaseException

# Setting up the connection pool
DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

pool = ConnectionPool(DATABASE_URL)


class PlayerQueries:
    """
    Class containing queries for the players table
    """

    def player_in_to_out(self, id: int, player: PlayerIn) -> PlayerOut:
        old_data = player.dict()
        return PlayerOut(id=id, **old_data)

    def convert_to_record(self, record):
        return PlayerOut(
            id=record[0],
            username=record[1],
            age=record[2],
            city=record[3],
            state=record[4],
            tags=record[5]
        )

    def create_player(self, player: PlayerIn) -> PlayerOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        INSERT INTO players (
                            username,
                            age,
                            city,
                            state,
                            tags
                        ) VALUES (
                            %s, %s, %s, %s, %s
                        )
                        RETURNING id;
                        """,
                        [
                            player.username,
                            player.age,
                            player.city,
                            player.state,
                            # player.lat,
                            # player.lon,
                            # player.location_radius,
                            player.tags
                        ]
                    )
                    id = result.fetchone()[0]
                    return self.player_in_to_out(id, player)
        except psycopg.Error:
            raise UserDatabaseException(
                f"Could not create player: {player.username}"
            )

    def get_all(self) -> List[PlayerList]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT id, username
                        FROM players
                        ORDER BY username;
                        """
                    )
                    return [PlayerList(
                        id=item[0],
                        username=item[1]
                    ) for item in cur]
        except Exception as e:
            print(e)
            return {"message": "could not retrieve players"}

    def update(self, player_id: int, player: PlayerIn) -> Union[PlayerOut, Error]:
        """
        Updates a player's details in the database
        """
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE players
                        SET username = %s,
                            age = %s,
                            city = %s,
                            state = %s,
                            tags = %s
                        WHERE id = %s
                        """,
                        [
                            player.username,
                            player.age,
                            player.city,
                            player.state,
                            # player.lat,
                            # player.lon,
                            # player.location_radius,
                            player.tags,
                            player_id
                        ]
                    )
                    if db.rowcount == 0:
                        return None
                    return self.player_in_to_out(player_id, player)
        except psycopg.Error as e:
            print(e)
            return Error(message=f"Could not update: {e}")

    def delete(self, player_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM players
                        WHERE id = %s
                        """,
                        [player_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def details(self, player_id: int) -> Optional[PlayerOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT id, username, age, city, state, tags
                        FROM players
                        WHERE id = %s
                        """,
                        [player_id]
                    )
                    record = result.fetchone()
                    return self.convert_to_record(record)
        except Exception as e:
            print(e)
            return {"message": "could not retrieve player details"}
