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
stupid mac stuff

## WHILE IN THE DB
In database, use \d to look at database
\d <name of table> like \d games

## IN THE API
docker exec -it boardbuddies-api-1 bash
python -m migrations up (this will create table in db)
python -m migrations down (this will destroy table in db)
