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
                game_image="https://www.orderofgamers.com/wordpress/wp-content/uploads/2023/08/catan.jpg",
                min_players=3,
                max_players=4,
                game_duration=90,
                min_age=10,
                max_age=0,
                tags="strategy",
                description="In CATAN (formerly The Settlers of Catan), players try to be the dominant force on the island of Catan by building settlements, cities, and roads. On each turn dice are rolled to determine what resources the island produces. Players build by spending resources (sheep, wheat, wood, brick and ore) that are depicted by these resource cards; each land type, with the exception of the unproductive desert, produces a specific resource: hills produce brick, forests produce wood, mountains produce ore, fields produce wheat, and pastures produce sheep."
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
        "game_image": "https://www.orderofgamers.com/wordpress/wp-content/uploads/2023/08/catan.jpg",
        "min_players": 3,
        "max_players": 4,
        "game_duration": 90,
        "min_age": 10,
        "max_age": 0,
        "tags": "strategy",
        "description": "In CATAN (formerly The Settlers of Catan), players try to be the dominant force on the island of Catan by building settlements, cities, and roads. On each turn dice are rolled to determine what resources the island produces. Players build by spending resources (sheep, wheat, wood, brick and ore) that are depicted by these resource cards; each land type, with the exception of the unproductive desert, produces a specific resource: hills produce brick, forests produce wood, mountains produce ore, fields produce wheat, and pastures produce sheep."
    }


class TestGetGameList:

    def get_all(self) -> List[GameOut]:
        return [
            GameOut(
                id=1,
                name="Catan",
                game_image="https://www.orderofgamers.com/wordpress/wp-content/uploads/2023/08/catan.jpg",
                min_players=3,
                max_players=4,
                game_duration=90,
                min_age=10,
                max_age=0,
                tags="strategy",
                description="In CATAN (formerly The Settlers of Catan), players try to be the dominant force on the island of Catan by building settlements, cities, and roads. On each turn dice are rolled to determine what resources the island produces. Players build by spending resources (sheep, wheat, wood, brick and ore) that are depicted by these resource cards; each land type, with the exception of the unproductive desert, produces a specific resource: hills produce brick, forests produce wood, mountains produce ore, fields produce wheat, and pastures produce sheep."
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
            "game_image": "https://www.orderofgamers.com/wordpress/wp-content/uploads/2023/08/catan.jpg",
            "min_players": 3,
            "max_players": 4,
            "game_duration": 90,
            "min_age": 10,
            "max_age": 0,
            "tags": "strategy",
            "description": "In CATAN (formerly The Settlers of Catan), players try to be the dominant force on the island of Catan by building settlements, cities, and roads. On each turn dice are rolled to determine what resources the island produces. Players build by spending resources (sheep, wheat, wood, brick and ore) that are depicted by these resource cards; each land type, with the exception of the unproductive desert, produces a specific resource: hills produce brick, forests produce wood, mountains produce ore, fields produce wheat, and pastures produce sheep."
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
        "game_image": "https://www.orderofgamers.com/wordpress/wp-content/uploads/2023/08/catan.jpg",
        "min_players": 3,
        "max_players": 4,
        "game_duration": 90,
        "min_age": 10,
        "max_age": 0,
        "tags": "strategy",
        "description": "In CATAN (formerly The Settlers of Catan), players try to be the dominant force on the island of Catan by building settlements, cities, and roads. On each turn dice are rolled to determine what resources the island produces. Players build by spending resources (sheep, wheat, wood, brick and ore) that are depicted by these resource cards; each land type, with the exception of the unproductive desert, produces a specific resource: hills produce brick, forests produce wood, mountains produce ore, fields produce wheat, and pastures produce sheep."
    }

    expected = {
        "id": 1,
        "name": "Catan",
        "game_image": "https://www.orderofgamers.com/wordpress/wp-content/uploads/2023/08/catan.jpg",
        "min_players": 3,
        "max_players": 4,
        "game_duration": 90,
        "min_age": 10,
        "max_age": 0,
        "tags": "strategy",
        "description": "In CATAN (formerly The Settlers of Catan), players try to be the dominant force on the island of Catan by building settlements, cities, and roads. On each turn dice are rolled to determine what resources the island produces. Players build by spending resources (sheep, wheat, wood, brick and ore) that are depicted by these resource cards; each land type, with the exception of the unproductive desert, produces a specific resource: hills produce brick, forests produce wood, mountains produce ore, fields produce wheat, and pastures produce sheep."
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
                game_image="https://www.orderofgamers.com/wordpress/wp-content/uploads/2023/08/catan.jpg",
                min_players=3,
                max_players=4,
                game_duration=90,
                min_age=10,
                max_age=0,
                tags="strategy",
                description="In CATAN (formerly The Settlers of Catan), players try to be the dominant force on the island of Catan by building settlements, cities, and roads. On each turn dice are rolled to determine what resources the island produces. Players build by spending resources (sheep, wheat, wood, brick and ore) that are depicted by these resource cards; each land type, with the exception of the unproductive desert, produces a specific resource: hills produce brick, forests produce wood, mountains produce ore, fields produce wheat, and pastures produce sheep."
            )
        None


def test_update_game():
    app.dependency_overrides[GameRepository] = TestUpdateGameQueries

    json_data = {
        "id": 1,
        "name": "Catan",
        "game_image": "https://www.orderofgamers.com/wordpress/wp-content/uploads/2023/08/catan.jpg",
        "min_players": 3,
        "max_players": 4,
        "game_duration": 90,
        "min_age": 10,
        "max_age": 0,
        "tags": "strategy",
        "description": "In CATAN (formerly The Settlers of Catan), players try to be the dominant force on the island of Catan by building settlements, cities, and roads. On each turn dice are rolled to determine what resources the island produces. Players build by spending resources (sheep, wheat, wood, brick and ore) that are depicted by these resource cards; each land type, with the exception of the unproductive desert, produces a specific resource: hills produce brick, forests produce wood, mountains produce ore, fields produce wheat, and pastures produce sheep."
    }

    expected = {
        "id": 1,
        "name": "Catan",
        "game_image": "https://www.orderofgamers.com/wordpress/wp-content/uploads/2023/08/catan.jpg",
        "min_players": 3,
        "max_players": 4,
        "game_duration": 90,
        "min_age": 10,
        "max_age": 0,
        "tags": "strategy",
        "description": "In CATAN (formerly The Settlers of Catan), players try to be the dominant force on the island of Catan by building settlements, cities, and roads. On each turn dice are rolled to determine what resources the island produces. Players build by spending resources (sheep, wheat, wood, brick and ore) that are depicted by these resource cards; each land type, with the exception of the unproductive desert, produces a specific resource: hills produce brick, forests produce wood, mountains produce ore, fields produce wheat, and pastures produce sheep."
    }

    response = client.put("api/game/1", json=json_data)
    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == expected
