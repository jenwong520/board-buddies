"""
Database Queries for Location
"""

import os
import psycopg
from psycopg_pool import ConnectionPool
from psycopg.rows import class_row
from typing import Optional
from models.locations import Locations
from utils.exceptions import UserDatabaseException

DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

pool =  ConnectionPool(DATABASE_URL)


class LocationQueries:
    """
    Class containing queries for the locations table
    """
    def create_location(self, name: str, city: str, state: str, store_type:str):
        """
        Creates location in the database

        Raises an Location insertion exception if createing the location fails
        """
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(Locations)) as cur:
                    cur.execute(
                        """
                        INSERT INTO location (
                        name,
                        city,
                        state,
                        store_type,
                        ) Values (
                            %s, %s, %s, %s,
                        )
                        RETURNING *;
                        """,
                        [
                            name,
                            city,
                            state,
                            store_type
                        ]
                    )
                    location = cur.fetchone()
                    if not location:
                        raise UserDatabaseException(
                            f"Could not Create location with name {name}"
                        )
        except psycopg.Error:
            raise UserDatabaseException(
                f"Could not Create location with name {name}"
            )
        return location
