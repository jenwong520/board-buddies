from main import app
from fastapi import Response
from fastapi.testclient import TestClient
from queries.game_queries import GameRepository
from models.games import GameIn, GameOut
from typing import List, Optional


client = TestClient(app)


def test_init():
    assert 1 == 1


class TestGetGameById:

    def get_one(self, id: int) -> Optional[GameOut]:
        if id == 1:
            return GameOut(
                id=1,
                name="Catan",
                game_image="image",
                min_players=3,
                max_players=4,
                game_duration=90,
                min_age=10,
                max_age=0,
                tags="strategy",
                description="description"
            )
        return None


def test_get_game_by_id():
    app.dependency_overrides[GameRepository] = TestGetGameById

    response = client.get("/api/game/1")
    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        "name": "Catan",
        "game_image": "image",
        "min_players": 3,
        "max_players": 4,
        "game_duration": 90,
        "min_age": 10,
        "max_age": 0,
        "tags": "strategy",
        "description": "description"
    }


class TestGetGameList:

    def get_all(self) -> List[GameOut]:
        return [
            GameOut(
                id=1,
                name="Catan",
                game_image="image",
                min_players=3,
                max_players=4,
                game_duration=90,
                min_age=10,
                max_age=0,
                tags="strategy",
                description="description"
            )
        ]


def test_post_request():
    # Arrange
    app.dependency_overrides[GameRepository] = TestGetGameList
    # Act
    response = client.get("/api/game/")
    # Clean up
    app.dependency_overrides = {}
    # Assert
    assert response.status_code == 200
    assert response.json() == [
        {
            "id": 1,
            "name": "Catan",
            "game_image": "image",
            "min_players": 3,
            "max_players": 4,
            "game_duration": 90,
            "min_age": 10,
            "max_age": 0,
            "tags": "strategy",
            "description": "description"
        }
    ]


class TestCreateGameQueries:

    def create(
            self, new_game: GameIn
    ) -> GameOut:
        return GameOut(
            id=1,
            name=new_game.name,
            game_image=new_game.game_image,
            min_players=new_game.min_players,
            max_players=new_game.max_players,
            game_duration=new_game.game_duration,
            min_age=new_game.min_age,
            max_age=new_game.max_age,
            tags=new_game.tags,
            description=new_game.description
        )


def test_create_game():
    app.dependency_overrides[GameRepository] = TestCreateGameQueries

    json_data = {
        "id": 1,
        "name": "Catan",
        "game_image": "image",
        "min_players": 3,
        "max_players": 4,
        "game_duration": 90,
        "min_age": 10,
        "max_age": 0,
        "tags": "strategy",
        "description": "description"
    }

    expected = {
        "id": 1,
        "name": "Catan",
        "game_image": "image",
        "min_players": 3,
        "max_players": 4,
        "game_duration": 90,
        "min_age": 10,
        "max_age": 0,
        "tags": "strategy",
        "description": "description"
    }

    response = client.post("api/game/", json=json_data)
    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == expected


class TestUpdateGameQueries:

    def update(
        self, id: int, response: Response
    ) -> GameOut:
        if id == 1:
            return GameOut(
                id=1,
                name="Catan",
                game_image="image",
                min_players=3,
                max_players=4,
                game_duration=90,
                min_age=10,
                max_age=0,
                tags="strategy",
                description="description"
            )
        None


def test_update_game():
    app.dependency_overrides[GameRepository] = TestUpdateGameQueries

    json_data = {
        "id": 1,
        "name": "Catan",
        "game_image": "image",
        "min_players": 3,
        "max_players": 4,
        "game_duration": 90,
        "min_age": 10,
        "max_age": 0,
        "tags": "strategy",
        "description": "description"
    }

    expected = {
        "id": 1,
        "name": "Catan",
        "game_image": "image",
        "min_players": 3,
        "max_players": 4,
        "game_duration": 90,
        "min_age": 10,
        "max_age": 0,
        "tags": "strategy",
        "description": "description"
    }

    response = client.put("api/game/1", json=json_data)
    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == expected
