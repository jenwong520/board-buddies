"""
Pydantic Models for Tags
"""
from pydantic import BaseModel

class TagIn(BaseModel):
    name: str

class TagOut(BaseModel):
    id: int
    name: str
