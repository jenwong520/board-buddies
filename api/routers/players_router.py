"""
Player Router
"""
from models.jwt import JWTUserData
from utils.authentication import try_get_jwt_user_data
from fastapi import (
    APIRouter,
    Depends,
)
from typing import List, Union, Optional
from models.players import (
    PlayerIn,
    PlayerOut,
    Error
)
from queries.players_queries import PlayerQueries


router = APIRouter(tags=["Player"], prefix="/api/players")


@router.get("/", response_model=List[PlayerOut])
async def get_players_list(repo: PlayerQueries = Depends()):
    """
    Get a list of all players (id and username)
    """
    return repo.get_all()


@router.get("/{player_id}", response_model=Union[PlayerOut, Error])
async def get_player_details(
    player_id: str,
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
    repo: PlayerQueries = Depends(),
    user: Optional[JWTUserData] = Depends(try_get_jwt_user_data)
):
    """
    Create a new player
    """
    if not user:
        return {"message": "Authentication required"}
    return repo.create_player(player, user.user_id)


@router.put("/{player_id}", response_model=Union[PlayerOut, Error])
async def update_player(
    player_id: str,
    player: PlayerIn,
    repo: PlayerQueries = Depends(),
    user: Optional[JWTUserData] = Depends(try_get_jwt_user_data)
):
    """
    Update a player's information
    """
    if not user:
        return {"message": "Authentication required"}
    result = repo.update(player_id, player, user.user_id)
    if result:
        return result
    return {"message": "Could not update player"}


@router.delete("/{player_id}", response_model=bool)
async def delete_player(
    repo: PlayerQueries = Depends(),
    user: Optional[JWTUserData] = Depends(try_get_jwt_user_data)
) -> bool:
    """
    Delete a player by ID
    """
    if not user:
        return {"message": "Authentication required"}
    return repo.delete(user.user_id)
