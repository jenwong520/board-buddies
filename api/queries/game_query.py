import os
import psycopg
from psycopg_pool import ConnectionPool
from models.games import (
    GameIn,
    GameOut,
    Error,
)
from typing import Optional, List, Union


pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class GameRepository:
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
                        , tags
                        , description
                        FROM games
                        ORDER BY name
                        """
                    )
                    return [
                        GameOut(
                            id=record[0],
                            name=record[1],
                            game_image=record[2],
                            min_players=record[3],
                            max_players=record[4],
                            game_duration=record[5],
                            min_age=record[6],
                            max_age=record[7],
                            tags=record[8],
                            description=record[9],
                        )
                        for record in db
                    ]
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
                            tags,
                            description
                            )
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s, %s, %s)
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
                            game.tags,
                            game.description
                            ]
                    )
                    id = result.fetchone()[0]
                    return self.game_in_to_out(id, game)
            except Exception:
                return {"message": "error!"}

    def get_one(self, game_id: int) -> Optional[GameOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                        , name
                        , game_image
                        , min_players
                        , max_players
                        , game_duration
                        , min_age
                        , max_age
                        , tags
                        , description
                        FROM games
                        WHERE id = %s
                        """,
                        [game_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_game_out(record)
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
                        , tags = %s
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
                            game.tags,
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
            tags=record[8],
            description=record[9],
        )
