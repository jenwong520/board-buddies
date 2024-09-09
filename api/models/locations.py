"""
Pydantic Models for Locations
"""
from pydantic import BaseModel

class Error(BaseModel):
    """
    Gets an error message
    """


    message: str

class LatLon(BaseModel):
    """
    Gets the latatued and longatude of a location bassed of the Google maps api
    """


    lat: float
    lon: float

class LocationIn(BaseModel):
    """
    Represents the paramaters required to create a new location
    """


    name: str
    city: str
    state: str
    store_type: str
    # lat_lon: Optional[LatLon]

class LocationOut(BaseModel):
    """
    Represents the paramaters required to create a new location
    """


    id: int
    name: str
    city: str
    state: str
    store_type: str
    # lat_lon: Optional[LatLon]


class LocationList(BaseModel):
    """
    Gets location name and id
    """


    id: int
    name: str

class LocationDetails(BaseModel):
    """
    Gets all location details including the id
    """


    id: int
    name: str
    city: str
    state: str
    store_type: str
