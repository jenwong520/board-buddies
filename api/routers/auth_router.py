"""
User and Player API Router
"""
from fastapi import (
    Depends,
    Request,
    Response,
    HTTPException,
    status,
    APIRouter,
)
from typing import List, Union, Optional
from queries.user_queries import UserQueries
from utils.exceptions import UserDatabaseException
from models.users import (
    UserCreate,
    UserOut,
    UserList,
    UserDetails,
    UserWithPw,
    Error
)
from utils.authentication import (
    try_get_jwt_user_data,
    hash_password,
    generate_jwt,
    verify_password,
)

router = APIRouter(tags=["Users"], prefix="/api/users")

# ----- Authentication Endpoints -----

@router.post("/signup", response_model=UserOut)
async def signup(
    new_user: UserCreate,
    request: Request,
    response: Response,
    queries: UserQueries = Depends(),
) -> UserOut:
    """
    Creates a new user when someone submits the signup form
    """
    # Hash the password the user sent us
    hashed_password = hash_password(new_user.password)
    print(new_user)
    # Create the user in the database
    try:
        user_data = queries.create_user(
            username=new_user.username,
            email=new_user.email,
            password=hashed_password,
            user_type=new_user.user_type
        )
    except UserDatabaseException as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not create user")

    # Generate a JWT token
    token = generate_jwt(user_data)

    # Secure cookies only if running on something besides localhost
    secure = True if request.headers.get("origin") == "localhost" else False

    # Set a cookie with the token in it
    response.set_cookie(
        key="fast_api_token",
        value=token,
        httponly=True,
        samesite="lax",
        secure=secure,
    )
    return user_data


@router.post("/signin", response_model=UserOut)
async def signin(
    user_request: UserCreate, # Assuming UserCreate is used for signin as well
    request: Request,
    response: Response,
    queries: UserQueries = Depends(),
) -> UserOut:
    """
    Signs the user in when they use the Sign In form
    """

    # Try to get the user from the database
    user = queries.get_by_username(user_request.username)

    if not user or not verify_password(user_request.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )

    # if not user:
    #     raise HTTPException(
    #         status_code=status.HTTP_401_UNAUTHORIZED,
    #         detail="Incorrect username or password",
    #     )

    # # Verify the user's password
    # if not verify_password(user_request.password, user.password):
    #     raise HTTPException(
    #         status_code=status.HTTP_401_UNAUTHORIZED,
    #         detail="Incorrect username or password",
    #     )

    # Generate a JWT token
    token = generate_jwt(user)

    # Secure cookies only if running on something besides localhost
    secure = True if request.headers.get("origin") == "localhost" else False

    # Set a cookie with the token in it
    response.set_cookie(
        key="fast_api_token",
        value=token,
        httponly=True,
        samesite="lax",
        secure=secure,
    )
    # Explicitly map the fields required by UserOut
    return UserOut(
        id=user.id,
        username=user.username,
        email=user.email,
        user_type=user.user_type
    )

@router.get("/authenticate", response_model=UserOut)
async def authenticate(
    user: UserWithPw = Depends(try_get_jwt_user_data),
) -> UserOut:
    """
    This function returns the user if the user is logged in.
    """
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Not logged in"
        )
    print("BANANAS", user)
    return user
    # return user


@router.delete("/signout")
async def signout(
    request: Request,
    response: Response,
):
    """
    Signs the user out by deleting their JWT Cookie
    """
    # Secure cookies only if running on something besides localhost
    secure = True if request.headers.get("origin") == "localhost" else False

    # Delete the cookie
    response.delete_cookie(
        key="fast_api_token", httponly=True, samesite="lax", secure=secure
    )

    # There's no need to return anything in the response.
    # All that has to happen is the cookie header must come back
    # Which causes the browser to delete the cookie
    return {"message": "Signed out successfully"}

# ----- Player-Specific Endpoints -----

@router.get("/players", response_model=List[UserList])
async def get_players_list(repo: UserQueries = Depends()):
    """
    Get a list of all players (id, username, and user_type='player')
    """
    return repo.get_all_players(user_type="player")  # Filter users by user_type='player'


@router.get("/players/{player_id}", response_model=Union[UserDetails, Error])
async def get_player_details(
    player_id: int,
    repo: UserQueries = Depends()
):
    """
    Get detailed information about a specific player.
    """
    player = repo.get_player_details(player_id)
    if not player or player.user_type != "player":
        raise HTTPException(status_code=404, detail="Player not found")
    return player


@router.put("/players/{player_id}", response_model=Union[UserDetails, Error])
async def update_player(
    player_id: int,
    player_data: UserCreate,  # Assuming similar structure for update
    repo: UserQueries = Depends()
):
    """
    Update a player's details.
    """
    updated_player = repo.update_player(player_id, player_data)
    if not updated_player or updated_player.user_type != "player":
        raise HTTPException(status_code=404, detail="Player not found or unable to update")
    return updated_player


@router.delete("/players/{player_id}", response_model=bool)
async def delete_player(player_id: int, repo: UserQueries = Depends()):
    """
    Delete a player by ID.
    """
    success = repo.delete_player(player_id)
    if not success:
        raise HTTPException(status_code=404, detail="Player not found or unable to delete")
    return True
