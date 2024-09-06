"""
Database Queries for Location
"""

import os
import psycopg
from psycopg_pool import ConnectionPool
from psycopg.rows import class_row
from typing import Optional
from models.locations import CreateLocations
from utils.exceptions import UserDatabaseException

DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

pool =  ConnectionPool(DATABASE_URL)


class LocationQueries:
    """
    Class containing queries for the locations table
    """
    def create_location(self, location: CreateLocations):
        """
        Creates location in the database

        Raises an Location insertion exception if createing the location fails
        """
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        INSERT INTO locations (
                        name,
                        city,
                        state,
                        store_type
                        ) Values (
                            %s, %s, %s, %s
                        )
                        RETURNING *;
                        """,
                        [
                            location.name,
                            location.city,
                            location.state,
                            location.store_type
                        ]
                    )
                    location = cur.fetchone()
                    print(location)
                    if not location:
                        raise UserDatabaseException(
                            f"Fetch one error Could not Create location with name {location.name}"
                        )
        except psycopg.Error:
            raise UserDatabaseException(
                f"psycopg error: Could not Create location with name {location.name}"
            )
        return location
