"""
Pydantic Models for Users.
"""
from pydantic import BaseModel
from typing import Optional


class UserRequest(BaseModel):
    """
    Represents a the parameters needed to create a new user
    """

    username: str
    password: str
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


class UserResponse(BaseModel):
    """
    Represents a user, with the password not included
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


class UserWithPw(BaseModel):
    """
    Represents a user with password included
    """

    id: int
    username: str
    password: str
