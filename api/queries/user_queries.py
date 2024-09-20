"""
Database Queries for Users
"""
import logging
import os
import psycopg
from psycopg_pool import ConnectionPool
from psycopg.rows import class_row
from typing import Optional
from models.users import UserWithPw
from utils.exceptions import UserDatabaseException
from uuid import uuid4

DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

pool = ConnectionPool(DATABASE_URL)


def create_uuid_for_new_user():
    user_id = str(uuid4())
    return user_id


uid = create_uuid_for_new_user()


class UserQueries:
    """
    Class containing queries for the Users table

    Can be dependency injected into a route like so

    def my_route(userQueries: UserQueries = Depends()):
        # Here you can call any of the functions to query the DB
    """

    def get_by_username(self, username: str) -> Optional[UserWithPw]:
        """
        Gets a user from the database by username

        Returns None if the user isn't found
        """
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(UserWithPw)) as cur:
                    cur.execute(
                        """
                            SELECT
                                *
                            FROM users
                            WHERE username = %s
                            """,
                        [username],
                    )
                    user = cur.fetchone()
                    if not user:
                        logging.warning(
                            f"User with username {username} not found."
                            )
        except psycopg.Error as e:
            logging.error(f"Error fetching user by username: {e}")
            raise UserDatabaseException(f"Error getting user {username}")
        return user

    def get_by_id(self, user_id: str) -> Optional[UserWithPw]:
        """
        Gets a user from the database by user id

        Returns None if the user isn't found
        """
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(UserWithPw)) as cur:
                    cur.execute(
                        """
                        SELECT *
                        FROM users
                        WHERE id = %s
                        """,
                        [user_id],
                    )
                    user = cur.fetchone()
                    if not user:
                        return None
        except psycopg.Error as e:
            logging.error(f"Error fetching user by id: {e}")
            raise UserDatabaseException(
                f"Error getting user with id {user_id}"
            )

        return user

    def create_user(self, username: str, hashed_password: str) -> UserWithPw:
        """
        Creates a new user in the database

        Raises a UserInsertionException if creating the user fails
        """
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(UserWithPw)) as cur:
                    cur.execute(
                        """
                        INSERT INTO users (
                            user_id,
                            username,
                            password
                        ) VALUES (
                            %s, %s, %s
                        )
                        RETURNING user_id, username, password;
                        """,
                        [uid, username, hashed_password]
                    )
                    user = cur.fetchone()
                    if not user:
                        raise UserDatabaseException(
                            f"Could not create user with username {username}"
                        )
        except psycopg.Error as e:
            raise UserDatabaseException(
                f"Could not create user with username
                {username}: {e}"
                )
        return user
