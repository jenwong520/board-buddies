"""
Pydantic Models for Players.
"""
from datetime import date
from pydantic import BaseModel, EmailStr, Field, constr
from typing import Optional, List
from models.tags import TagOut


class Error(BaseModel):
    """
    Gets An Error Message
    """
    message: str


class PlayerIn(BaseModel):
    """
    Parameters required to create a new player
    """
    profile_picture: Optional[str] = None
    email: Optional[EmailStr] = Field(None, description="Valid email address.")
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    city: Optional[str] = None
    state: Optional[constr(strict=True, min_length=2, max_length=2)] = None
    about_me: Optional[str] = None
    birthdate: Optional[date] = None
    is_verified: Optional[bool] = None
    is_gamehost: Optional[bool] = None
    gamehost_id: Optional[int] = None
    is_playtester: Optional[bool] = None
    playtester_id: Optional[int] = None
    is_developer: Optional[bool] = None
    developer_id: Optional[int] = None
    is_player: Optional[bool] = None
    # tags: Optional[List[str]]         // Work in progress for tags


class PlayerOut(BaseModel):
    """
    Parameters returned after creating a new player
    """
    user_id: str
    profile_picture: Optional[str] = None
    email: Optional[EmailStr] = Field(None, description="Valid email address.")
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    city: Optional[str] = None
    state: Optional[constr(strict=True, min_length=2, max_length=2)] = None
    about_me: Optional[str] = None
    birthdate: Optional[date] = None
    is_verified: Optional[bool] = None
    is_gamehost: Optional[bool] = None
    gamehost_id: Optional[int] = None
    is_playtester: Optional[bool] = None
    playtester_id: Optional[int] = None
    is_developer: Optional[bool] = None
    developer_id: Optional[int] = None
    is_player: Optional[bool] = None
    player_id: Optional[str] = None

class PlayerTagUpdate(BaseModel):
    tags: List[int]

class PlayerWithTagsOut(BaseModel):
    player: PlayerOut
    tags: List[TagOut]

# Work in progress for tags

# class TagOut(BaseModel):
#     tag_id: int
#     tag_name: str


# class PlayerDetailsWithTags(BaseModel):
#     player: PlayerOut
#     tags: List[TagOut]
