"""
Pydantic Models for Meetups
"""
from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List


class Error(BaseModel):
    """
    Gets an error message
    """

    message: str


class MeetupIn(BaseModel):
    """
    Input model for creating a meetup
    """

    meetup_name: str
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
    meetup_name: str
    organizer_id: str
    organizer_username: str
    organizer_picture: str
    game_name: str
    game_image: Optional[str]
    location_name: str
    location_address: str
    location_city: str
    location_state: str
    location_store_type: str
    meetup_date: datetime
    description: str
    min_players: int
    max_players: int
    status: str


class ParticipantOut(BaseModel):
    participant_id: str
    username: str
    profile_picture: Optional[str]


class MeetupDetailsOut(BaseModel):
    meetup: MeetupOut
    participants: List[ParticipantOut]
