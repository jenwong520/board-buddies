"""
Database Queries for Tags
"""

import os
import psycopg
from psycopg_pool import ConnectionPool
from typing import List
from models.tags import (
    TagIn,
    TagOut,
)

DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

pool = ConnectionPool(DATABASE_URL)


class TagQueries:
    """
    Class containing queries for the tags table
    """
    def create_tag(self, tag: TagIn) -> TagOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        INSERT INTO tags (name)
                        VALUES (%s)
                        RETURNING id, name;
                        """, [tag.name]
                    )
                    record = cur.fetchone()
                    return TagOut(id=record[0], name=record[1])
        except psycopg.Error as e:
            raise Exception(f"Error creating tag: {e}")

    def get_all_tags(self) -> List[TagOut]:
        """
        Gets a list of all the tags.
        """
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT
                            id,
                            name
                        FROM tags
                        ORDER BY name;
                        """
                    )
                    return [TagOut(
                        id=row[0],
                        name=row[1]
                    )
                    for row in cur.fetchall()]
        except Exception as e:
            raise Exception(f"Could not get tags: {e}")

    def update_tag(self, tag_id: int, new_name: str) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        UPDATE tags
                        SET name = %s
                        WHERE id = %s;
                        """,
                        [new_name, tag_id]
                    )
                    if cur.rowcount == 0:
                        return False
                    return True
        except Exception as e:
            print(f"Error updating tag: {e}")
            return False

    def delete_tag(self, tag_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM tags
                        WHERE id = %s;
                        """,
                        [tag_id]
                    )
                    if cur.rowcount == 0:
                        return False
                    return True
        except Exception as e:
            print(f"Error deleting tag: {e}")
            return False
