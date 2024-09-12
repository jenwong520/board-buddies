from pydantic import BaseModel
from typing import Optional


class Error(BaseModel):
    """
    Gets An Error Message
    """
    message: str


class LatLon(BaseModel):
    """
    Gets the latitude and longitude of a player's location
    """
    lat: float
    lon: float


class PlayerIn(BaseModel):
    """
    Parameters required to create a new player
    """
    username: str
    age: int
    city: str
    state: str
    # lat: float
    # lon: float
    # location_radius: int
    tags: Optional[str] = None
    # is_developer = bool
    # developer_id = int
    # is_verified = bool
    # is_gamehost = bool
    # is_playtester = bool
    # playtester_id = int


class PlayerOut(BaseModel):
    """
    Parameters returned after creating a new player
    """
    id: int
    username: str
    age: int
    city: str
    state: str
    # lat: float
    # lon: float
    # location_radius: int
    tags: Optional[str] = None
    # is_developer = bool
    # developer_id = int
    # is_verified = bool
    # is_gamehost = bool
    # is_playtester = bool
    # playtester_id = int


class PlayerList(BaseModel):
    """
    Gets player's ID and username
    """

    id: int
    username: str


class PlayerDetails(BaseModel):
    """
    Gets all player details including the ID
    """

    id: int
    username: str
    age: int
    city: str
    state: str
    # lat: float
    # lon: float
    # location_radius: int
    tags: Optional[str] = None
    # is_verified = bool
    # is_gamehost = bool
    # is_playtester = bool
    # playtester_id = int
