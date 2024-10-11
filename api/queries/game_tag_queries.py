"""
Database Queries for Game Tags
"""

import os
import psycopg
from psycopg_pool import ConnectionPool
from typing import Optional, List, Union
from models.tags import (
    TagIn,
    TagOut,
)

DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

pool = ConnectionPool(DATABASE_URL)

class GameTagQueries:
    def add_tags_to_game(self, game_id: int, tags: List[int]):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    # Delete existing tags for the game
                    cur.execute("DELETE FROM game_tags WHERE game_id = %s;", [game_id])
                   
                    # Add the new tags for the game
                    for tag_id in tags:
                        cur.execute(
                            """
                            INSERT INTO game_tags (game_id, tag_id)
                            VALUES (%s, %s)
                            ON CONFLICT DO NOTHING;
                            """, [game_id, tag_id]
                        )
        except Exception as e:
            print(f"Error adding tags to game: {e}")
            raise Exception("Could not add tags to game")

    def remove_tags_from_game(self, game_id: int, tags: List[int]):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    for tag_id in tags:
                        cur.execute(
                            """
                            DELETE FROM game_tags
                            WHERE game_id = %s AND tag_id = %s;
                            """, [game_id, tag_id]
                        )
        except Exception as e:
            print(f"Error removing tags from game: {e}")
            raise Exception("Could not remove tags from game")

    def get_tags_for_game(self, game_id: int) -> List[TagOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT t.id, t.name
                        FROM tags t
                        JOIN game_tags gt ON t.id = gt.tag_id
                        WHERE gt.game_id = %s;
                        """, [game_id]
                    )
                    return [TagOut(id=row[0], name=row[1]) for row in cur.fetchall()]
        except Exception as e:
            raise Exception(f"Could not get tags for game: {e}")
