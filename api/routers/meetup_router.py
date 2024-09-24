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
    MeetupDetailsOut,
    Error
)
from queries.meetup_queries import MeetupQueries
from models.jwt import JWTUserData
from utils.authentication import try_get_jwt_user_data


router = APIRouter(tags=["Meetup"], prefix="/api/meetup")


@router.get("/", response_model=Union[List[MeetupDetailsOut], Error])
async def list_meetups(
    repo: MeetupQueries = Depends()
) -> List[MeetupDetailsOut]:
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


@router.get("/{meetup_id}", response_model=Union[MeetupDetailsOut, Error])
async def get_meetup_details(
    meetup_id: int,
    repo: MeetupQueries = Depends()
) -> Union[MeetupDetailsOut, Error]:
    result = repo.details(meetup_id)
    if result:
        return result
    return {"message": "Meetup not found"}


@router.put("/{meetup_id}", response_model=Union[MeetupOut, Error])
async def update_meetup(
    meetup_id: int,
    meetup: MeetupIn,
    repo: MeetupQueries = Depends(),
    user: Optional[JWTUserData] = Depends(try_get_jwt_user_data)
) -> Union[MeetupOut, Error]:
    if not user:
        return {"message": "Authentication required"}

    is_organizer = repo.check_if_organizer(meetup_id, user.user_id)
    if not is_organizer:
        return {"message": "Only the organizer can update this meetup"}

    result = repo.update(meetup_id, meetup, user.user_id)
    if result:
        return result
    return {"message": "Could not update meetup"}


@router.delete("/{meetup_id}", response_model=bool)
async def delete_meetup(
    meetup_id: int,
    repo: MeetupQueries = Depends(),
    user: Optional[JWTUserData] = Depends(try_get_jwt_user_data)
) -> bool:
    if not user:
        raise HTTPException(status_code=403, detail="Authentication required")

    is_organizer = repo.check_if_organizer(meetup_id, user.user_id)
    if not is_organizer:
        raise HTTPException(status_code=403, detail="Only the organizer can delete this meetup")

    return repo.delete(meetup_id)


@router.post("/{meetup_id}/join", response_model=Union[bool, Error])
async def join_meetup(
    meetup_id: int,
    repo: MeetupQueries = Depends(),
    user: Optional[JWTUserData] = Depends(try_get_jwt_user_data)
) -> Union[bool, Error]:
    if not user:
        raise HTTPException(status_code=403, detail="Authentication required")

    result = repo.join_meetup(meetup_id, user.user_id)

    if isinstance(result, Error):
        raise HTTPException(status_code=400, detail=result.message)

    return result


@router.delete("/{meetup_id}/leave", response_model=bool)
async def leave_meetup(
    meetup_id: int,
    repo: MeetupQueries = Depends(),
    user: Optional[JWTUserData] = Depends(try_get_jwt_user_data)
) -> bool:
    if not user:
        return {"message": "Authentication required"}

    success = repo.leave_meetup(meetup_id, user.user_id)
    return success
