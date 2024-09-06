"""
Location Router
"""
from fastapi import (APIRouter,
                     Depends
                    )
from typing import List
from models.locations import CreateLocations, LocationList
from queries.location_queries import LocationQueries

router = APIRouter(tags=["Location"], prefix="/api/location")


@router.get("/", response_model=List[LocationList])
async def get_locations_list(repo: LocationQueries = Depends()):
    return repo.get_all()

@router.get("/id")
async def get_location_details():
    pass

@router.post("/", response_model=CreateLocations)
async def create_location(
    location: CreateLocations,
    repo: LocationQueries = Depends()
    ):
    repo.create_location(location)
    return location


@router.delete("/id")
async def delete_location():
    pass

@router.put("/id")
async def update_location():
    pass
