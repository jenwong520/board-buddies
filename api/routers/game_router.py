"""
Game Router
"""

from fastapi import APIRouter, Depends, Response
from typing import Union, List, Optional
from models.games import (
    GameIn,
    GameOut,
    Error
)
from queries.game_queries import GameRepository


router = APIRouter(tags=["Game"], prefix="/api/game")


@router.get("/", response_model=Union[List[GameOut], Error])
async def get_all(repo: GameRepository = Depends()):
    return repo.get_all()


@router.post("/", response_model=Union[GameOut, Error])
async def create_game(
    game: GameIn,
    repo: GameRepository = Depends(),
):
    return repo.create(game)


@router.get("/{game_id}", response_model=Optional[GameOut])
async def get_one_game(
    game_id: int,
    response: Response,
    repo: GameRepository = Depends(),
) -> GameOut:
    game = repo.get_one(game_id)
    if game is None:
        response.status_code = 404
    return game


@router.put("/{game_id}", response_model=Union[GameOut, Error])
async def update_game(
    game_id: int,
    response: Response,
    game: GameIn,
    repo: GameRepository = Depends(),
) -> Union[Error, GameOut]:
    updated_game = repo.update(game_id, game)
    if updated_game is None:
        response.status_code = 404
        return {"message": "Game not found"}
    return updated_game


@router.delete("/{game_id}", response_model=bool)
async def delete_game(
    game_id: int,
    repo: GameRepository = Depends(),
) -> bool:
    return repo.delete(game_id)
