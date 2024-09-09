"""
Location Router
"""
from fastapi import (APIRouter,
                    Depends,
                    Response
                    )
from typing import List, Union
from models.locations import (LocationIn,
                            LocationList,
                            LocationDetails,
                            LocationOut,
                            Error)
from queries.location_queries import LocationQueries


router = APIRouter(tags=["Location"], prefix="/api/location")


@router.get("/", response_model=List[LocationList])
async def get_locations_list(repo: LocationQueries = Depends()):
    return repo.get_all()

@router.get("/{location_id}")
async def get_location_details(
    location_id: int,
    repo: LocationQueries = Depends()
):
    return repo.details(location_id)

@router.post("/", response_model=Union[LocationOut, Error])
async def create_location(
    location: LocationIn,
    response: Response,
    repo: LocationQueries = Depends()
    ):
    return repo.create_location(location)


@router.delete("/{location_id}", response_model=bool)
async def delete_location(
    location_id : int,
    repo: LocationQueries = Depends()
)-> bool:
    return repo.delete(location_id)

@router.put("/{location_id}", response_model=Union[LocationOut, Error])
async def update_location(
    location_id: int,
    location: LocationIn,
    repo: LocationQueries = Depends()
):
    print(repo)
    return repo.update(location_id, location)
