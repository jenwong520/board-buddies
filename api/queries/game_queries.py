"""
Database Queries for Games
"""

import os
import psycopg
from psycopg_pool import ConnectionPool
from models.games import (
    GameIn,
    GameOut,
    Error,
)
from typing import Optional, List, Union
from queries.game_tag_queries import GameTagQueries


pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class GameRepository:
    def __init__(self):
        self.tag_queries = GameTagQueries()

    def get_all(self) -> Union[Error, List[GameOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id
                        , name
                        , game_image
                        , min_players
                        , max_players
                        , game_duration
                        , min_age
                        , max_age
                        , description
                        FROM games
                        ORDER BY name
                        """
                    )
                    games = db.fetchall()
                    result = []
                    for game_record in games:
                        game_id = game_record[0]
                        tags = self.tag_queries.get_tags_for_game(game_id)
                        result.append(GameOut(
                            id=game_record[0],
                            name=game_record[1],
                            game_image=game_record[2],
                            min_players=game_record[3],
                            max_players=game_record[4],
                            game_duration=game_record[5],
                            min_age=game_record[6],
                            max_age=game_record[7],
                            description=game_record[8],
                            tags=tags
                        ))
                    return result
        except Exception as e:
            print(e)
            return {"message": "Could not get all games"}

    def create(self, game: GameIn) -> GameOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO games (
                            name,
                            game_image,
                            min_players,
                            max_players,
                            game_duration,
                            min_age,
                            max_age,
                            description
                            )
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            game.name,
                            game.game_image,
                            game.min_players,
                            game.max_players,
                            game.game_duration,
                            game.min_age,
                            game.max_age,
                            game.description
                            ]
                    )
                    game_id = result.fetchone()[0]
                    self.tag_queries.add_tags_to_game(game_id, game.tag_ids)

                    return self.game_in_to_out(id, game)
        except Exception:
            return {"message": "error!"}

    def get_one(self, game_id: int) -> Optional[GameOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id
                        , name
                        , game_image
                        , min_players
                        , max_players
                        , game_duration
                        , min_age
                        , max_age
                        , description
                        FROM games
                        WHERE id = %s
                        """,
                        [game_id]
                    )
                    game_record = db.fetchone()
                    if game_record is None:
                        return None
                    tags = self.tag_queries.get_tags_for_game(game_id)

                    return GameOut(
                        id=game_record[0],
                        name=game_record[1],
                        game_image=game_record[2],
                        min_players=game_record[3],
                        max_players=game_record[4],
                        game_duration=game_record[5],
                        min_age=game_record[6],
                        max_age=game_record[7],
                        description=game_record[8],
                        tags=tags
                    )
        except Exception as e:
            print(e)
            return {"message": "Could not get game"}

    def update(self, game_id: int, game: GameIn) -> Union[GameOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE games
                        SET name = %s
                        , game_image = %s
                        , min_players = %s
                        , max_players = %s
                        , game_duration = %s
                        , min_age = %s
                        , max_age = %s
                        , description = %s
                        WHERE id = %s
                        """,
                        [
                            game.name,
                            game.game_image,
                            game.min_players,
                            game.max_players,
                            game.game_duration,
                            game.min_age,
                            game.max_age,
                            game.description,
                            game_id
                        ]
                    )
                    if db.rowcount == 0:
                        return None
                    return self.game_in_to_out(game_id, game)
        except psycopg.Error as e:
            print(e)
            return Error(message=f"Could not update: {e}")

    def delete(self, game_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM games
                        WHERE id = %s
                        """,
                        [game_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def game_in_to_out(self, id: int, game: GameIn):
        old_data = game.dict()
        return GameOut(id=id, **old_data)

    def record_to_game_out(self, record):
        return GameOut(
            id=record[0],
            name=record[1],
            game_image=record[2],
            min_players=record[3],
            max_players=record[4],
            game_duration=record[5],
            min_age=record[6],
            max_age=record[7],
            description=record[8],
        )
