"""
Pydantic Models for Users.
"""
from pydantic import BaseModel
from typing import Optional
from enum import Enum


class UserType(str, Enum):
    player = 'player'
    game_developer = 'game_developer'
    admin = 'admin'


class Error(BaseModel):
    """
    Gets An Error Message
    """
    message: str


class LatLon(BaseModel):
    """
    Gets the latitude and longitude of a player's location
    """
    lat: float
    lon: float


class UserBase(BaseModel):
    """
    Base class for user attributes
    """
    username: str
    email: str


class PlayerSpecific(BaseModel):
    """
    Additional attributes specific to players
    """
    id: int
    user_id: int
    age: Optional[int] = None
    city: Optional[str] = None
    state: Optional[str] = None
    tags: Optional[str] = None
    is_verified: Optional[bool] = None
    is_gamehost: Optional[bool] = None
    gamehost_id: Optional[int] = None
    is_playtester: Optional[bool] = None
    playtester_id: Optional[int] = None
    # is_developer = bool
    # developer_id = int
    lat: Optional[float]
    lon: Optional[float]
    location_radius: Optional[int] = None
    # lat: float ??
    # lon: float ??
    # location_radius: int ??


class UserCreate(UserBase):
    """
    Parameters required to create a new user
    """
    password: str
    user_type: UserType  # e.g., 'player', 'developer', etc.
    # player_specific: Optional[PlayerSpecific] = None

class UserOut(UserBase):
    """
    Parameters returned after creating a new user
    """
    id: int
    username: str
    email: str
    user_type: UserType  # e.g., 'player', 'developer', etc.
    # player_specific: Optional[PlayerSpecific] = None

class UserList(BaseModel):
    """
    Basic user information for lists
    """
    id: int
    username: str
    user_type: UserType  # e.g., 'player', 'developer', etc.

class UserDetails(UserBase):
    """
    Detailed user information
    """
    id: int
    user_type: str  # e.g., 'player', 'developer', etc.
    player_specific: Optional[PlayerSpecific] = None

class UserWithPw(BaseModel):
    """
    Represents a user with password included
    """

    id: int
    username: str
    email: str
    user_type: UserType
    password: str
