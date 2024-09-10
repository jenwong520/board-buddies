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


@router.get("/", response_model=List[MeetupOut])
async def list_meetups(
    repo: MeetupQueries = Depends()
) -> List[MeetupOut]:
    return repo.get_all()


@router.get("/{meetup_id}", response_model=MeetupOut)
async def get_meetup_details(
    meetup_id: int,
    repo: MeetupQueries = Depends()
) -> MeetupOut:
    return repo.details(meetup_id)


@router.put("/{meetup_id}", response_model=Union[MeetupOut, Error])
async def update_meetup(
    meetup_id: int,
    meetup: MeetupIn,
    repo: MeetupQueries = Depends()
):
    return repo.update(meetup_id, meetup)


@router.delete("/{meetup_id}", response_model=bool)
async def delete_meetup(
    meetup_id: int,
    repo: MeetupQueries = Depends()
) -> bool:
    return repo.delete(meetup_id)
