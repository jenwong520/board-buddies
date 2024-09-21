Jen-journal

Created a migration file called "006_create_game.py" in migrations folder.
In that python file, I wrote some SQL stuff that will CREATE TABLE and DROP TABLE

# USEFUL COMMANDS
## HOW TO GET IN THE DB
Stop docker in terminal, but run it through Docker app
Type this terminal to see what docker containers are running: docker ps
Find the database api and get the name: boardbuddies-db-1
Type in terminal to connect to running service that contains api service: docker exec -it boardbuddies-db-1 bash
Inside that running service with starts with root@568d54a5fe3d:/#, run this command to get in database: psql -h localhost -U user db_name

## ALTERNATIVE WAY TO GET INTO THE DB
In terminal, enter this command to get into your database:
docker exec -it boardbuddies-db-1 psql -U user -d db_name

## WHILE IN THE DB
In database, use \d to look at database
\d <name of table> like \d games

## IN THE API
docker exec -it boardbuddies-api-1 bash
python -m migrations up (this will create table in db)
python -m migrations down (this will destroy table in db)

9/14/2024

## Current backend:

1. Migrations File:
This script defines how to create and drop the games table:

The table has fields like id, name, game_image, min_players, max_players, game_duration, min_age, max_age, tags, and description.

The table is created when the migration runs and can be dropped if needed.

2. Models:
Two Pydantic models:

GameIn: For input, used when creating or updating a game.
GameOut: For output, used when retrieving game information.

Both models contain fields like name, game_image, min_players, max_players, game_duration, min_age, max_age, tags, and description.

3. Queries (Repository):

PostgreSQL and psycopg are used to interact with the database via connection pooling.

get_all(): Fetches all games from the games table and returns them ordered by name.
create(): Inserts a new game into the games table and returns the inserted game.
get_one(): Fetches a single game by id.
update(): Updates the fields of a specific game by its id.
delete(): Deletes a game by id.

4. Routers:

These routers define the FastAPI endpoints:

GET /api/game/: Retrieves all games.
POST /api/game/: Creates a new game.
GET /api/game/{game_id}: Retrieves a specific game by id.
PUT /api/game/{game_id}: Updates a specific game by id.
DELETE /api/game/{game_id}: Deletes a game by id.

9/13/2024

Created issue, made migration request, and successfully migrated

9/16/2024

Starting frontend development for list of games

# List of games
Include:
- Image
- Name of game
- Short details (maybe)
- Age range
- Range of player numbers
Should be clickable to see details
Perhaps include a "Submit game" button

9/17/2024
-Created GameList component to list all games
-Created GameDetail component to show game detail
-Did some fancy CSS styling


## Backing up data

OR https://stackoverflow.com/questions/24718706/backup-restore-a-dockerized-postgresql-database

In your terminal, in your boardbuddies directory:

If you want to backup and restore your psql db here are the commands -->

1) docker exec -t boardbuddies-db-1 pg_dumpall -c -U postgres > my_backup.sql

To upload database back up, run:

2) cat my_backup.sql | docker exec -i boardbuddies-db-1 psql -U postgres

Where you see "authentication-demo-db-1" switch that to the name of your docker containers db (to get that run docker ps)
-U <username> in this case mine is -U postgres
> <backup_name> the carrot means output the contents to the named file next, in my case I named it my_backup.sql
