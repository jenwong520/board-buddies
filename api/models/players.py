"""
Pydantic Models for Players.
"""
from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class Error(BaseModel):
    """
    Gets An Error Message
    """
    message: str


class PlayerIn(BaseModel):
    """
    Parameters required to create a new player
    """
    email: EmailStr = Field(..., description="A valid email address.")
    age: Optional[int] = None
    city: Optional[str] = None
    state: Optional[str] = None
    tags: Optional[str] = None
    is_verified: Optional[bool] = None
    is_gamehost: Optional[bool] = None
    gamehost_id: Optional[int] = None
    is_playtester: Optional[bool] = None
    playtester_id: Optional[int] = None
    is_developer: Optional[bool] = None
    developer_id: Optional[int] = None
    is_player: Optional[bool] = None
    # player_id: Optional[UUID] = None
    lat: Optional[float]
    lon: Optional[float]
    location_radius: Optional[int] = None


class PlayerOut(BaseModel):
    """
    Parameters returned after creating a new player
    """
    user_id: str
    email: EmailStr = Field(..., description="A valid email address.")
    age: Optional[int] = None
    city: Optional[str] = None
    state: Optional[str] = None
    tags: Optional[str] = None
    is_verified: Optional[bool] = None
    is_gamehost: Optional[bool] = None
    gamehost_id: Optional[int] = None
    is_playtester: Optional[bool] = None
    playtester_id: Optional[int] = None
    is_developer: Optional[bool] = None
    developer_id: Optional[int] = None
    is_player: Optional[bool] = None
    player_id: Optional[str] = None
    lat: Optional[float]
    lon: Optional[float]
    location_radius: Optional[int] = None
