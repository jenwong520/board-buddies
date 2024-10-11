"""
Pydantic Models for Games
"""
from pydantic import BaseModel
from typing import Optional, List
from models.tags import TagOut


class Error(BaseModel):
    message: str


class GameIn(BaseModel):
    name: str
    game_image: Optional[str]
    min_players: int
    max_players: int
    game_duration: int
    min_age: int
    max_age: Optional[int]
    description: str
    tag_ids: List[int]


class GameOut(BaseModel):
    id: int
    name: str
    game_image: Optional[str]
    min_players: int
    max_players: int
    game_duration: int
    min_age: int
    max_age: Optional[int]
    description: str
    tag_ids: List[TagOut]
