"""
Meetup Router
"""
from fastapi import (
    APIRouter,
    Depends,
    Response
)
from typing import List, Union, Optional
from models.meetups import (
    MeetupIn,
    MeetupOut,
    Error
)
from queries.meetup_queries import MeetupQueries
from models.jwt import JWTUserData
from utils.authentication import try_get_jwt_user_data


router = APIRouter(tags=["Meetup"], prefix="/api/meetup")


@router.get("/", response_model=Union[List[MeetupOut], Error])
async def list_meetups(
    repo: MeetupQueries = Depends()
) -> List[MeetupOut]:
    return repo.get_all()


@router.post("/", response_model=Union[MeetupOut, Error])
async def create_meetup(
    meetup: MeetupIn,
    repo: MeetupQueries = Depends(),
    user: Optional[JWTUserData] = Depends(try_get_jwt_user_data)
):
    if not user:
        return {"message": "Authentication required"}
    return repo.create(meetup, user.user_id)


@router.get("/{meetup_id}", response_model=Union[MeetupOut, Error])
async def get_meetup_details(
    meetup_id: int,
    repo: MeetupQueries = Depends()
) -> MeetupOut:
    result = repo.details(meetup_id)
    if result:
        return result
    return {"message": "Meetup not found"}


@router.put("/{meetup_id}", response_model=Union[MeetupOut, Error])
async def update_meetup(
    meetup_id: int,
    response: Response,
    meetup: MeetupIn,
    repo: MeetupQueries = Depends(),
    user: Optional[JWTUserData] = Depends(try_get_jwt_user_data)
) -> Union[MeetupOut, Error]:
    if not user:
        return {"message": "Authentication required"}
    result = repo.update(meetup_id, meetup, user.user_id)
    if result:
        return result
    return {"message": "Could not update meetup"}


@router.delete("/{meetup_id}", response_model=bool)
async def delete_meetup(
    meetup_id: int,
    repo: MeetupQueries = Depends()
) -> bool:
    return repo.delete(meetup_id)
