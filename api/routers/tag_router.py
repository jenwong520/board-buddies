"""
Tag Router
"""
from fastapi import APIRouter, Depends, HTTPException
from models.tags import TagIn, TagOut
from queries.tag_queries import TagQueries
from typing import List

router = APIRouter(tags=["Tags"], prefix="/api")


@router.post("/tags", response_model=TagOut)
def create_tag(tag: TagIn, tag_queries: TagQueries = Depends()):
    return tag_queries.create_tag(tag)


@router.get("/tags", response_model=List[TagOut])
async def get_tags(
    repo: TagQueries = Depends()
) -> List[TagOut]:
    return repo.get_all_tags()


@router.put("/tags/{tag_id}", response_model=TagOut)
async def update_tag(
    tag_id: int,
    tag: TagIn,
    repo: TagQueries = Depends()
) -> TagOut:
    success = repo.update_tag(tag_id, tag.name)
    if not success:
        raise HTTPException(status_code=404, detail="Tag not found")
    return TagOut(id=tag_id, name=tag.name)


@router.delete("/tags/{tag_id}")
async def delete_tag(tag_id: int, tag_queries: TagQueries = Depends()):
    success = tag_queries.delete_tag(tag_id)
    if not success:
        raise HTTPException(status_code=404, detail="Tag not found")
    return {"message": "Tag successfully deleted"}
