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

logging.basicConfig(level=logging.ERROR)


DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

pool = ConnectionPool(DATABASE_URL)


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
            profile_picture=record[1],
            email=record[2],
            first_name=record[3],
            last_name=record[4],
            city=record[5],
            state=record[6],
            about_me=record[7],
            birthdate=record[8],
            is_verified=record[9],
            is_gamehost=record[10],
            gamehost_id=record[11],
            is_playtester=record[12],
            playtester_id=record[13]
        )

    def create_player(self, player: PlayerIn, user_id: str) -> PlayerOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        INSERT INTO players (
                            player_id,
                            profile_picture,
                            email,
                            first_name,
                            last_name,
                            city,
                            state,
                            about_me,
                            birthdate,
                            is_verified,
                            is_gamehost,
                            gamehost_id,
                            is_playtester,
                            playtester_id
                        ) VALUES (
                            %s, %s, %s, %s, %s, %s,
                            %s, %s, %s, %s, %s, %s,
                            %s, %s
                        )
                        RETURNING player_id;
                        """,
                        [
                            user_id,
                            player.profile_picture,
                            player.email,
                            player.first_name,
                            player.last_name,
                            player.city,
                            player.state,
                            player.about_me,
                            player.birthdate,
                            player.is_verified,
                            player.is_gamehost,
                            player.gamehost_id,
                            player.is_playtester,
                            player.playtester_id
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
            raise UserDatabaseException("Could not retrieve player details")
        
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
                    conn.autocommit = False
                    cur.execute(
                        """
                        UPDATE players
                        SET profile_picture = %s,
                            email = %s,
                            first_name = %s,
                            last_name = %s,
                            city = %s,
                            state = %s,
                            about_me = %s,
                            birthdate = %s,
                            is_verified = %s,
                            is_gamehost = %s,
                            gamehost_id = %s,
                            is_playtester = %s,
                            playtester_id = %s
                        WHERE player_id = %s
                        """,
                        [
                            player.profile_picture,
                            player.email,
                            player.first_name,
                            player.last_name,
                            player.city,
                            player.state,
                            player.about_me,
                            player.birthdate,
                            player.is_verified,
                            player.is_gamehost,
                            player.gamehost_id,
                            player.is_playtester,
                            player.playtester_id,
                            player_id
                        ]
                    )
                    if cur.rowcount == 0:
                        raise UserDatabaseException(
                            "No player found with the given ID."
                        )

                    # self.update_player_tags(conn, cur, player_id, player.tags)    // Work in progress for tags

                    return self.player_in_to_out(player, user_id)
        except psycopg.Error as e:
            conn.rollback()
            print(e)
            return Error(message=f"Could not update: {e}")

    # Work In Progress Code For Tags

    # def update_player_tags(self, cur, player_id: str, tags: List[str]):
    #     """
    #     Updates the tags for a player using a single query to manage relationships.
    #     """
    #     try:
    #         # Delete old player-tag relationships
    #         cur.execute("""
    #             DELETE FROM player_tags WHERE player_id = %s;
    #         """, (player_id,))

    #         if not tags:
    #             return  # If no tags are provided, simply return

    #         # Insert new player tags in a single statement
    #         # First ensure all tags are present in the tags table
    #         insert_tags_query = """
    #             INSERT INTO tags (tag_name)
    #             VALUES (%s)
    #             ON CONFLICT (tag_name) DO NOTHING;
    #         """
    #         for tag in tags:
    #             cur.execute(insert_tags_query, (tag,))

    #         # Get tag IDs for the newly added tags
    #         cur.execute("""
    #             SELECT tag_id FROM tags WHERE tag_name = ANY(%s);
    #         """, (tags,))
    #         tag_ids = [row[0] for row in cur.fetchall()]

    #         # Insert new player-tag relationships in a single statement
    #         insert_relationships_query = """
    #             INSERT INTO player_tags (player_id, tag_id)
    #             SELECT %s, unnest(%s)
    #         """
    #         cur.execute(insert_relationships_query, (player_id, tag_ids))

    #     except psycopg.Error as e:
    #         raise UserDatabaseException(f"Error updating player tags: {e}")


# Work In Progress Code For Tags

# class PlayerRepository:
#     def __init__(self, db_pool: pool.connection):
#         self.db_pool = db_pool

#     # Insert tags and update player-tags relationship
#     def update_player_tags(self, player_id: int, tags: List[str]):
#         with self.db_pool.connection() as conn:
#             with conn.cursor() as cur:
#                 # Ensure all tags are present in the tags table
#                 for tag in tags:
#                     cur.execute("""
#                         INSERT INTO tags (tag_name)
#                         VALUES (%s)
#                         ON CONFLICT (tag_name) DO NOTHING;
#                     """, (tag,))

#                 # Get tag IDs for the player's tags
#                 cur.execute("""
#                     SELECT tag_id FROM tags WHERE tag_name = ANY(%s);
#                 """, (tags,))
#                 tag_ids = [row[0] for row in cur.fetchall()]

#                 # Delete old tags for the player
#                 cur.execute("""
#                     DELETE FROM player_tags WHERE player_id = %s;
#                 """, (player_id,))

#                 # Insert new player tags
#                 for tag_id in tag_ids:
#                     cur.execute("""
#                         INSERT INTO player_tags (player_id, tag_id)
#                         VALUES (%s, %s);
#                     """, (player_id, tag_id))

#                 conn.commit()
