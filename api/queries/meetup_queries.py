# """
# Database Queries for Location
# """

# import os
# from psycopg_pool import ConnectionPool
# from typing import Optional, List
# from models.meetups import (
#     MeetupIn,
#     MeetupOut
# )

# DATABASE_URL = os.environ.get("DATABASE_URL")
# if not DATABASE_URL:
#     raise ValueError("DATABASE_URL environment variable is not set")

# pool = ConnectionPool(DATABASE_URL)


# class MeetupQueries:
#     """
#     Class containing queries for the meetups table
#     """
#     def meetup_in_out(self, id: int, meetup: MeetupIn) -> MeetupOut:
#         old_data = meetup.dict()
#         return MeetupOut(id=id, **old_data)

#     def convert_to_record(self, record):
#         return MeetupOut(
#             id=record[0],
#             time=record[1],
#             description=record[2],
#             min_players=record[3],
#             max_players=record[4],
#             completed=record[5]
#         )

#     def create(self, meetup: MeetupIn) -> MeetupOut:
#         """
#         Creates Meetup in the database

#         Raises an Meetup insertion exception if createing the Meetup fails
#         """
#         try:
#             with pool.connection() as conn:
#                 with conn.cursor() as cur:
#                     result = cur.execute(
#                         """
#                         INSERT INTO meetups (
#                         time,
#                         description,
#                         min_players,
#                         max_players,
#                         completed
#                         ) Values (
#                             %s, %s, %s, %s, %s
#                         )
#                         RETURNING id;
#                         """,
#                         [
#                             meetup.meetup_date,
#                             meetup.description,
#                             meetup.min_players,
#                             meetup.max_players,
#                             meetup.is_completed
#                             user_id
#                         ]
#                     )
#                     id = result.fetchone()[0]
#                     return self.meetup_in_out(id, meetup)

#         except Exception as e:
#             print(e)
#             return {"message": "could not create meetup in database"}

#     def get_all(self) -> List[MeetupOut]:
#         """
#         Gets a liat of all the meetup
#         """
#         try:
#             with pool.connection() as conn:
#                 with conn.cursor() as cur:
#                     cur.execute(
#                         """
#                         SELECT *
#                         FROM meetups
#                         ORDER BY id
#                         """
#                     )
#                     return [MeetupOut(
#                         id=item[0],
#                         time=item[1],
#                         description=item[2],
#                         min_players=item[3],
#                         max_players=item[4],
#                         completed=item[5]
#                     )
#                         for item in cur]

#         except Exception as e:
#             print(e)
#             return {"message": "cound not get a lists of meetups"}

#     def update(self, meetup_id: int, meetup: MeetupIn) -> MeetupOut:
#         """
#         Updates the details of a sepesific meetup
#         """
#         try:
#             with pool.connection() as conn:
#                 with conn.cursor() as cur:
#                     cur.execute(
#                         """
#                         UPDATE meetups
#                         SET time = %s
#                         , description = %s
#                         , min_players = %s
#                         , max_players = %s
#                         , completed = %s
#                         WHERE id = %s
#                         """,
#                         [
#                             meetup.time,
#                             meetup.description,
#                             meetup.min_players,
#                             meetup.max_players,
#                             meetup.completed,
#                             meetup_id
#                         ]
#                     )
#                     return self.meetup_in_out(meetup_id, meetup)
#         except Exception as e:
#             print(e)
#             return {"message": "Could not update meetup details"}

#     def delete(self, meetup_id: int) -> bool:
#         try:
#             with pool.connection() as conn:
#                 with conn.cursor() as cur:
#                     cur.execute(
#                         """
#                         DELETE FROM meetups
#                         WHERE id = %s
#                         """,
#                         [meetup_id]
#                     )
#                     return True
#         except Exception as e:
#             print(e)
#             return False

#     def details(self, meetup_id: int) -> Optional[MeetupOut]:
#         try:
#             with pool.connection() as conn:
#                 with conn.cursor() as cur:
#                     result = cur.execute(
#                         """
#                         SELECT id
#                             , time
#                             , description
#                             , min_players
#                             , max_players
#                             , completed
#                         FROM meetups
#                         WHERE id = %s
#                         """,
#                         [meetup_id]
#                     )
#                     record = result.fetchone()
#                     return self.convert_to_record(record)
#         except Exception as e:
#             print(e)
#             return {"message": "Could not get meetup details"}
