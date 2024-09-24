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

    # organizer_id: str
    game_id: int
    location_id: int
    meetup_date: datetime
    description: str
    min_players: int
    max_players: int
    status: Optional[str] = Field(default="scheduled")


class MeetupOut(BaseModel):
    """
    Output model for meetup details
    """
    id: int
    organizer_id: str
    game_id: int
    location_id: int
    meetup_date: datetime
    description: str
    min_players: int
    max_players: int
    status: str
