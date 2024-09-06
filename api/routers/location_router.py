"""
Location Router
"""
from fastapi import (APIRouter,
                     Depends
                    )
from models.locations import CreateLocations
from queries.location_queries import LocationQueries

router = APIRouter(tags=["Location"], prefix="/api/location")


@router.get("/")
async def get_locations_list():
    pass

@router.get("/id")
async def get_location_details():
    pass

@router.post("/create")
async def create_location(
    location: CreateLocations,
    repo: LocationQueries = Depends()
    ):
    repo.create_location(location)
    return location


@router.delete("/id/delete")
async def delete_location():
    pass

@router.get("/id/update")
async def update_location():
    pass
