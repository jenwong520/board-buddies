"""
Pydantic Models for Meetups
"""
from pydantic import BaseModel, Field
from datetime import datetime


class Error(BaseModel):
    """
    Gets an error message
    """

    message: str


class MeetupIn(BaseModel):
    """
    Input model for creating a meetup
    """

    time: datetime
    description: str
    min_players: int
    max_players: int
    completed: bool = Field(default=False)


class MeetupOut(BaseModel):
    """
    Input model for creating a meetup
    """

    id: int
    time: datetime
    description: str
    min_players: int
    max_players: int
    completed: bool = Field(default=False)
