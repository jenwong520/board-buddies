"""
Pydantic Models for Users.
"""
import re
from pydantic import BaseModel, Field, constr, validator


class UserRequest(BaseModel):
    """
    Represents a the parameters needed to create a new user
    """
    username: constr(min_length=3, max_length=50) = Field(..., description="Username should be alphanumeric with dashes or underscores.")
    password: constr(min_length=8) = Field(..., description="Password must be at least 8 characters long.")


@validator('username')
def validate_username(cls, value):
    if not re.match("^[a-zA-Z0-9_-]+$", value):
        raise ValueError("Username should be alphanumeric with dashes or underscores.")
    return value


@validator('password')
def validate_password(cls, value):
    if not re.search(r"[A-Z]", value):
        raise ValueError("Password must contain at least one uppercase letter.")
    if not re.search(r"[0-9]", value):
        raise ValueError("Password must contain at least one number.")
    return value


class UserResponse(BaseModel):
    """
    Represents a user, without the password
    """
    user_id: str
    username: str


class UserWithPw(BaseModel):
    """
    Represents a user with password included
    """
    user_id: str
    username: str
    password: str
