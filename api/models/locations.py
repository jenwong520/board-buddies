"""
Pydantic Models for Locations
"""
from pydantic import BaseModel


class CreateLocations(BaseModel):
    """
    Represents the paramaters required to create a new location
    """

    name: str
    city: str
    state: str
    store_type: str

class GetLocationId(BaseModel):
    """
    Gets location name and id
    """

    id: int
    name: str
