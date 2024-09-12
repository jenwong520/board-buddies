"""
Player Router
"""
from fastapi import (
    APIRouter,
    Depends,
)
from typing import List, Union
from models.players import (
    PlayerIn,
    PlayerList,
    PlayerOut,
    Error
)
from queries.players_queries import PlayerQueries


router = APIRouter(tags=["Player"], prefix="/api/players")


@router.get("/", response_model=List[PlayerList])
async def get_players_list(repo: PlayerQueries = Depends()):
    """
    Get a list of all players (id and username)
    """
    return repo.get_all()


@router.get("/{player_id}", response_model=Union[PlayerOut, Error])
async def get_player_details(
    player_id: int,
    repo: PlayerQueries = Depends()
):
    """
    Get detailed information about a specific player
    """
    result = repo.details(player_id)
    if result:
        return result
    return {"message": "Player not found"}


@router.post("/", response_model=Union[PlayerOut, Error])
async def create_player(
    player: PlayerIn,
    repo: PlayerQueries = Depends()
):
    """
    Create a new player
    """
    return repo.create_player(player)


@router.put("/{player_id}", response_model=Union[PlayerOut, Error])
async def update_player(
    player_id: int,
    player: PlayerIn,
    repo: PlayerQueries = Depends()
):
    """
    Update a player's information
    """
    result = repo.update(player_id, player)
    if result:
        return result
    return {"message": "Could not update player"}


@router.delete("/{player_id}", response_model=bool)
async def delete_player(
    player_id: int,
    repo: PlayerQueries = Depends()
) -> bool:
    """
    Delete a player by ID
    """
    return repo.delete(player_id)
