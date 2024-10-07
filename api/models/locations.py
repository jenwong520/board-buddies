"""
Pydantic Models for Locations
"""
from pydantic import BaseModel


class Error(BaseModel):
    """
    Gets an error message
    """

    message: str


class LocationIn(BaseModel):
    """
    Represents the paramaters required to create a new location
    """

    name: str
    address: str
    city: str
    state: str
    store_type: str


class LocationOut(BaseModel):
    """
    Represents the paramaters returned with the location api
    """

    id: int
    name: str
    address: str
    city: str
    state: str
    store_type: str
