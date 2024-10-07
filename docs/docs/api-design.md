# API Design

## Authentication
Description: Handles user registration during signin, and JWT-based authentication.
- POST ``/api/auth/signup``: Creates a new user when someone submits the signup form and assigns a uuid for user_id and timestamps when they joined.
- POST ``/api/auth/signin``: Signs the user in when they use the Sign In form.
- GET ``/api/auth/authenticate``: Returns the user if the user is logged in.
- DELETE ``/api/auth/signout``: Signs the user out by deleting their JWT Cookie

Request:
```
{
  "username": "UltimateBoardGamer",
  "password": "password"
}
```
Response:
```
{
  "user_id": "0537d3c8-2cb9-47a4-8106-ffd7d78f51e2",
  "username": "UltimateBoardGamer",
  "is_developer": null,
  "is_player": null,
  "date_joined": "2024-10-07T13:31:20.859028"
}
```

## Player
Description: Handles player registration after signup.
- GET ``/api/players/``: Returns list of all players.
- POST ``/api/players/``: Creates a new player.
- GET ``/api/player/{player_id}``: Returns specific player details based on uuid.
- POST ``/api/players/{player_id}``: Update a player's information.
- DELETE ``/api/player/{player_id}``: Delete a player by uuid.
Request:
```
{
  "email": "UltimateBoardGamer@example.com",
  "age": 25,
  "city": "Denver",
  "state": "C0",
  "tags": "everything",
  "is_verified": true,
  "is_gamehost": true,
  "gamehost_id": 0,
  "is_playtester": true,
  "playtester_id": 0,
  "is_developer": true,
  "developer_id": 0,
  "is_player": true,
  "lat": 0,
  "lon": 0,
  "location_radius": 0,
  "profile_picture": "/player-icons/board-buddies-icon-raccoon"
}
```

Response:
```
{
    "user_id": "0537d3c8-2cb9-47a4-8106-ffd7d78f51e2",
    "profile_picture": "/player-icons/board-buddies-icon-raccoon",
    "email": "UltimateBoardGamer@example.com",
    "first_name": null,
    "last_name": null,
    "city": "Denver",
    "state": "C0",
    "about_me": null,
    "birthdate": null,
    "is_verified": true,
    "is_gamehost": true,
    "gamehost_id": 0,
    "is_playtester": true,
    "playtester_id": 0,
    "is_developer": null,
    "developer_id": null,
    "is_player": null,
    "player_id": null,
    "tags": "everything",
    "lat": 0,
    "lon": 0,
    "location_radius": 0
}
```

## Game
Description: Handles game data.
- GET ``/api/game/``: Returns list of games.
- POST ``/api/game/``: Creates a game.
- GET ``/api/game/{game_id}``: Returns specific game details.
- POST ``/api/game/{game_id}``: Update game details.
- DELETE ``/api/game/{game_id}``: Delete a game by id.
Request:
```
{
  "name": "string",
  "game_image": "string",
  "min_players": 0,
  "max_players": 0,
  "game_duration": 0,
  "min_age": 0,
  "max_age": 0,
  "tags": "string",
  "description": "string"
}
```

Response:
```
{
  "id": 1,
  "name": "string",
  "game_image": "string",
  "min_players": 0,
  "max_players": 0,
  "game_duration": 0,
  "min_age": 0,
  "max_age": 0,
  "tags": "string",
  "description": "string"
}
```

## Location
Description: Handles location data.
- GET ``/api/location/``: Returns list of locations.
- POST ``/api/location/``: Creates a location.
- GET ``/api/location/{location_id}``: Returns specific location details.
- POST ``/api/location/{location_id}``: Update location details.
- DELETE ``/api/location/{location_id}``: Delete a location by id.
Request:
```
{
  "name": "string",
  "address": "string",
  "city": "string",
  "state": "string",
  "store_type": "string"
}
```
Response:
```
{
  "id": 0,
  "name": "string",
  "address": "string",
  "city": "string",
  "state": "string",
  "store_type": "string"
}
```

## Meetup
Description: Handles meetup data.
- GET ``/api/meetup/``: Returns list of meetups.
- POST ``/api/meetup/``: Creates a meetup.
- GET ``/api/meetup/{meetup_id}``: Returns specific meetup details.
- POST ``/api/meetup/{meetup_id}``: Update meetup details.
- DELETE ``/api/meetup/{meetup_id}``: Delete a meetup by id.
- POST ``/api/meetup/{meetup_id}/join``: Join a meetup
- DELETE ``/api/meetup/{meetup_id}/leave``: Leave a meetup

Request:
```
{
  "meetup_name": "string",
  "game_id": 0,
  "location_id": 0,
  "start_time": "2024-10-07T02:27:11.761Z",
  "end_time": "2024-10-07T02:27:11.761Z",
  "description": "string",
  "min_players": 0,
  "max_players": 0,
  "status": "scheduled"
}
```
Response:
```
{
  "id": 9,
  "meetup_name": "string",
  "organizer_id": "0537d3c8-2cb9-47a4-8106-ffd7d78f51e2",
  "organizer_username": "/player-icons/board-buddies-icon-raccoon",
  "organizer_picture": "UltimateBoardGamer",
  "game_name": "Catan",
  "game_image": "https://www.orderofgamers.com/wordpress/wp-content/uploads/2023/08/catan.jpg",
  "location_name": "Turn Zero Games",
  "location_address": "3959 Wilshire Blvd ste a-9",
  "location_city": "Los Angeles",
  "location_state": "CA",
  "location_store_type": "Game Store",
  "start_time": "2024-10-07T02:27:11.761000",
  "end_time": "2024-10-07T02:27:11.761000",
  "description": "string",
  "min_players": 0,
  "max_players": 0,
  "status": "scheduled"
}
```
