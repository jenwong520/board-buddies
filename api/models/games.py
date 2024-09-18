from pydantic import BaseModel
from typing import Optional


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
    tags: str
    description: str


class GameOut(BaseModel):
    id: int
    name: str
    game_image: Optional[str]
    min_players: int
    max_players: int
    game_duration: int
    min_age: int
    max_age: Optional[int]
    tags: str
    description: str
