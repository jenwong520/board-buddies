"""
Meetup Router
"""
from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)
from typing import List, Union, Optional
from models.meetups import (
    MeetupIn,
    MeetupOut,
    Error
)
from queries.meetup_queries import MeetupQueries
from utils.authentication import try_get_jwt_user_data
from models.jwt import JWTUserData


router = APIRouter(tags=["Meetup"], prefix="/api/meetup")


@router.post("/", response_model=Union[MeetupOut, Error])
async def create_meetup(
    meetup: MeetupIn,
    repo: MeetupQueries = Depends(),
    user: Optional[JWTUserData] = Depends(try_get_jwt_user_data)  # JWT dependency
) -> Union[MeetupOut, Error]:
    if not user:
        raise HTTPException(status_code=403, detail="Not authenticated")
    return repo.create(meetup, user.id)


@router.get("/", response_model=List[MeetupOut])
async def list_meetups(
    repo: MeetupQueries = Depends(),
    user: Optional[JWTUserData] = Depends(try_get_jwt_user_data)
) -> List[MeetupOut]:
    if not user:
        HTTPException(status_code=403, detail="Not authenticated")
    return repo.get_all()


@router.get("/{meetup_id}", response_model=MeetupOut)
async def get_meetup_details(
    meetup_id: int,
    repo: MeetupQueries = Depends(),
    user: Optional[JWTUserData] = Depends(try_get_jwt_user_data)
) -> MeetupOut:
    if not user:
        raise HTTPException(status_code=403, detail="Not authenticated")
    return repo.details(meetup_id)


@router.put("/{meetup_id}", response_model=Union[MeetupOut, Error])
async def update_meetup(
    meetup_id: int,
    meetup: MeetupIn,
    repo: MeetupQueries = Depends(),
    user: Optional[JWTUserData] = Depends(try_get_jwt_user_data)
) -> Union[MeetupOut, Error]:
    if not user:
        raise HTTPException(status_code=403, detail="Not authenticated")
    return repo.update(meetup_id, meetup)


@router.delete("/{meetup_id}", response_model=bool)
async def delete_meetup(
    meetup_id: int,
    repo: MeetupQueries = Depends(),
    user: Optional[JWTUserData] = Depends(try_get_jwt_user_data)\
) -> bool:
    if not user:
        raise HTTPException(status_code=403, detail="Not authenticated")

    return repo.delete(meetup_id)
