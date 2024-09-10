"""
Meetup Router
"""
from fastapi import (
    APIRouter,
    Depends,
)
from typing import List, Union
from models.meetups import (
    MeetupIn,
    MeetupOut,
    Error
)
from queries.meetup_queries import MeetupQueries


router = APIRouter(tags=["Meetup"], prefix="/api/meetup")


@router.post("/", response_model=Union[MeetupOut, Error])
async def create_meetup(
    meetup: MeetupIn,
    repo: MeetupQueries = Depends()
) -> MeetupOut:
    return repo.create(meetup)
