"""
Pydantic Models for Locations
"""
from pydantic import BaseModel
from typing import Optional

class LatLon(BaseModel):
    """
    Gets the latatued and longatude of a location bassed of the Google maps api
    """

    lat : float
    lon : float

class CreateLocations(BaseModel):
    """
    Represents the paramaters required to create a new location
    """

    name: str
    city: str
    state: str
    store_type: str
    # lat_lon: Optional[LatLon]

class GetLocationId(BaseModel):
    """
    Gets location name and id
    """

    id: int
    name: str
