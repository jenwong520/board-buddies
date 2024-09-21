"""
Pydantic Models for Meetups
"""
from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class Error(BaseModel):
    """
    Gets an error message
    """

    message: str


class MeetupIn(BaseModel):
    """
    Input model for creating a meetup
    """

    game_id: int
    location_id: int
    meetup_date: datetime
    host_id: int
    description: str
    min_players: int
    max_players: int
    is_completed: bool = Field(default=False)


class MeetupOut(BaseModel):
    """
    Input model for creating a meetup
    """

    id: int
    game_id: int
    location_id: int
    meetup_date: datetime
    host_id: int
    description: str
    min_players: int
    max_players: int
    is_completed: bool = Field(default=False)

