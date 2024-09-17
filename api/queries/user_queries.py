"""
Database Queries for Users
"""
import os
import psycopg
from psycopg_pool import ConnectionPool
from psycopg.rows import class_row
from typing import Optional, List, Dict, Union
from models.users import (
    UserWithPw,
    UserCreate,
    UserOut,
    UserList,
    UserDetails,
    PlayerSpecific,
    LatLon,
    Error
)
from utils.exceptions import UserDatabaseException

DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

pool = ConnectionPool(DATABASE_URL)


class UserQueries:
    """
    Class containing queries for the Users table
    """

    def get_by_username(self, username: str) -> Optional[UserWithPw]:
        """
        Gets a user from the database by username
        """
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(UserWithPw)) as cur:
                    cur.execute(
                        """
                            SELECT id, username, email, password, user_type
                            FROM users
                            WHERE username = %s
                            """,
                        [username],
                    )
                    user = cur.fetchone()
                    if not user:
                        return None
        except psycopg.Error as e:
            print(e)
            raise UserDatabaseException(f"Error getting user {username}")
        return user

    def get_by_id(self, id: int) -> Optional[UserWithPw]:
        """
        Gets a user from the database by user id
        """
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(UserWithPw)) as cur:
                    cur.execute(
                        """
                        SELECT id, username, email, user_type
                        FROM users
                        WHERE id = %s
                        """,
                        [id],
                    )
                    user = cur.fetchone()
                    if not user:
                        return None
        except psycopg.Error as e:
            print(e)
            raise UserDatabaseException(f"Error getting user with id {id}")
        # print(user.dict())
        return user

    def create_user(self, username: str, email: str, password: str, user_type: str) -> UserOut:
        """
        Creates a new user in the database and optionally player-specific details.
        """
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(UserOut)) as cur:
                    # Begin transaction
                    with conn.transaction():
                        # Step 1: Insert into the users table
                        cur.execute(
                            """
                            INSERT INTO users (
                                username,
                                email,
                                password,
                                user_type
                            ) VALUES (
                                %s, %s, %s, %s
                            )
                            RETURNING *;
                            """,
                            (username, email, password, user_type))

                        # user_id = cur.fetchone()[0] # Get the ID of the newly inserted user

                        # # Step 2: If the user is of type "player", insert into player_details
                        # if player_specific:
                        #     cur.execute(
                        #         """
                        #         INSERT INTO player_details (
                        #                 user_id,
                        #                 age,
                        #                 city,
                        #                 state,
                        #                 tags,
                        #                 is_verified,
                        #                 is_gamehost,
                        #                 gamehost_id,
                        #                 is_playtester,
                        #                 playtester_id,
                        #                 lat,
                        #                 lon,
                        #                 location_radius
                        #             ) VALUES (
                        #                 %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s
                        #             );
                        #         """,
                        #         (user_id, player_specific.get('age'), player_specific.get('city'), player_specific.get('state'), player_specific.get('tags'),
                        #         player_specific.get('is_verified'), player_specific.get('is_gamehost'), player_specific.get('gamehost_id'), player_specific.get('is_playtester'),
                        #         player_specific.get('playtester_id'), player_specific.get('lat_lon', {}).get('lat'), player_specific.get('lat_lon', {}).get('lon'),
                        #         player_specific.get('location_radius')))

                        # Fetch the full user details
                        # cur.execute(
                        #     """
                        #         SELECT id, username, email, user_type
                        #         FROM users
                        #         WHERE id = %s;
                        #     """,
                        #     (user_id,))

                        user = cur.fetchone()
                        return user

        except psycopg.Error as e:
            raise UserDatabaseException(f"Could not create user: {str(e)}")


    def get_all_users(self, user_type: Optional[str] = None) -> List[UserList]:
        """
        Gets all users from the database, optionally filtered by user_type
        """
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    query = """
                        SELECT id, username, user_type
                        FROM users
                    """
                    if user_type:
                        query += " WHERE user_type = %s"
                        params = [user_type]
                    else:
                        params = []

                    query += " ORDER BY username;"

                    cur.execute(query, params)
                    return [UserList(
                        id=item[0],
                        username=item[1],
                        user_type=item[2]
                    ) for item in cur]
        except Exception as e:
            print(e)
            raise UserDatabaseException("Could not retrieve users")

    def update_user(self, user_id: int, user_details: UserDetails) -> Union[UserDetails, Error]:
        """
        Updates a user's details in the database
        """
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        UPDATE users
                        SET username = %s,
                            email = %s,
                            user_type = %s
                        WHERE id = %s
                        """,
                        [
                            user_details.username,
                            user_details.email,
                            user_details.user_type,
                            user_id
                        ]
                    )
                    if cur.rowcount == 0:
                        return Error(message="No rows updated")

                    # Update player-specific details if available
                    if user_details.player_specific:
                        cur.execute(
                            """
                            UPDATE player_details
                            SET age = %s,
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
                            WHERE user_id = %s
                            """,
                            [
                                user_details.player_specific.age,
                                user_details.player_specific.city,
                                user_details.player_specific.state,
                                user_details.player_specific.tags,
                                user_details.player_specific.is_verified,
                                user_details.player_specific.is_gamehost,
                                user_details.player_specific.gamehost_id,
                                user_details.player_specific.is_playtester,
                                user_details.player_specific.playtester_id,
                                user_details.player_specific.lat_lon.lat if user_details.player_specific.lat_lon else None,
                                user_details.player_specific.lat_lon.lon if user_details.player_specific.lat_lon else None,
                                user_details.player_specific.location_radius,
                                user_id
                            ]
                        )

                    return user_details
        except psycopg.Error as e:
            print(e)
            return Error(message=f"Could not update user: {e}")

    def delete_user(self, user_id: int) -> bool:
        """
        Deletes a user from the database
        """
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM users
                        WHERE id = %s
                        """,
                        [user_id]
                    )
                    if cur.rowcount > 0:
                        # Also delete player-specific details if they exist
                        cur.execute(
                            """
                            DELETE FROM player_details
                            WHERE user_id = %s
                            """,
                            [user_id]
                        )
                        return True
                    return False
        except psycopg.Error as e:
            print(e)
            return False

    def get_user_details(self, user_id: int) -> Optional[UserDetails]:
        """
        Gets detailed user information by user id
        """
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT u.id, u.username, u.email, u.user_type, p.age, p.city, p.state, p.tags, p.is_verified, p.is_gamehost, p.gamehost_id, p.is_playtester, p.playtester_id, p.lat, p.lon, p.location_radius
                        FROM users u
                        LEFT JOIN player_details p ON u.id = p.user_id
                        WHERE u.id = %s
                        """,
                        [user_id]
                    )
                    record = cur.fetchone()
                    if record:
                        return UserDetails(
                            id=record[0],
                            username=record[1],
                            email=record[2],
                            user_type=record[3],
                            player_specific=PlayerSpecific(
                                age=record[4],
                                city=record[5],
                                state=record[6],
                                tags=record[7],
                                is_verified=record[8],
                                is_gamehost=record[9],
                                gamehost_id=record[10],
                                is_playtester=record[11],
                                playtester_id=record[12],
                                lat_lon=LatLon(lat=record[13], lon=record[14]) if record[13] and record[14] else None,
                                location_radius=record[15]
                            ) if record[4] is not None else None
                        )
                    return None
        except Exception as e:
            print(e)
            return None
