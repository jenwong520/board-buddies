"""
Database Queries for Location
"""

import os
import psycopg
from psycopg_pool import ConnectionPool
from typing import Optional, List
from models.locations import (
    LocationIn,
    LocationOut
)
from utils.exceptions import UserDatabaseException

DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

pool = ConnectionPool(DATABASE_URL)


class LocationQueries:
    """
    Class containing queries for the locations table
    """
    def location_conversion(self, id: int, location: LocationIn):
        old_data = location.dict()
        return LocationOut(id=id, **old_data)

    def convert_to_record(self, record):
        return LocationOut(
            id=record[0],
            name=record[1],
            address=record[2],
            city=record[3],
            state=record[4],
            store_type=record[5]
        )

    def create_location(self, location: LocationIn) -> LocationOut:
        """
        Creates location in the database

        Raises an Location insertion exception if createing the location fails
        """
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        INSERT INTO locations (
                        name,
                        address,
                        city,
                        state,
                        store_type
                        ) Values (
                            %s, %s, %s, %s, %s
                        )
                        RETURNING id;
                        """,
                        [
                            location.name,
                            location.address,
                            location.city,
                            location.state,
                            location.store_type
                        ]
                    )
                    id = result.fetchone()[0]
                    return self.location_conversion(id, location)
        except psycopg.Error:
            raise UserDatabaseException(
                f"psycopg error: Flake8 made me do this {location.name}"
            )

    def get_all(self) -> List[LocationOut]:
        """
        Gets a list of the names of all the locations including the id
        """
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT id,
                        name,
                        address,
                        city,
                        state,
                        store_type
                        FROM locations
                        ORDER BY city
                        """
                    )
                    return [LocationOut(
                        id=item[0],
                        name=item[1],
                        address=item[2],
                        city=item[3],
                        state=item[4],
                        store_type=item[5]
                        )
                        for item in cur]

        except Exception as e:
            print(e)
            return {"message": "could not get all Locations"}

    def update(self, location_id: int, location: LocationIn) -> LocationOut:
        """
        Updates the location paramaters
        """
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        UPDATE locations
                        SET name = %s,
                        address = %s,
                        city = %s,
                        state = %s,
                        store_type = %s
                        WHERE id = %s
                        """,
                        [
                            location.name,
                            location.address,
                            location.city,
                            location.state,
                            location.store_type,
                            location_id
                        ]
                    )
                    if cur.rowcount == 0:
                        return None
                    return self.location_conversion(location_id, location)
        except Exception as e:
            print(e)
            return {"message": "could not update location"}

    def delete(self, location_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM locations
                        WHERE id = %s
                        """,
                        [location_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def details(self, location_id: int) -> Optional[LocationOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT id
                            , name
                            , address
                            , city
                            , state
                            , store_type
                        FROM locations
                        WHERE id = %s
                        """,
                        [location_id]
                    )
                    record = result.fetchone()
                    return self.convert_to_record(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get location details"}
