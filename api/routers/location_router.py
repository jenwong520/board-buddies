"""
Location Router
"""
from fastapi import (APIRouter)
from models.locations import CreateLocations

router = APIRouter(tags=["Location"], prefix="/api/location")


@router.get("/")
async def get_locations_list():
    pass

@router.get("/id")
async def get_location_details():
    pass

@router.post("/create")
async def create_location(location: CreateLocations):
    return location

@router.delete("/id/delete")
async def delete_location():
    pass

@router.get("/id/update")
async def update_location():
    pass
