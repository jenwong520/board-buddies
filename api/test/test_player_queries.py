from main import app
from fastapi.testclient import TestClient
from queries.player_queries import PlayerQueries
from models.players import PlayerIn, PlayerOut
from models.users import UserResponse
from typing import List, Optional


from utils.authentication import try_get_jwt_user_data


client = TestClient(app)


def JwtUserData():
    return UserResponse(
        user_id="0b00da19-4846-451e-b1ef-bbf72de17cd4",
        username="Test_Person",
        is_developer="true",
        is_player="true",
        date_joined= "2024-10-04T00:08:00.007Z"
    )


def test_init():
    assert 1 == 1


class TestCreatePlayerQueries:

    def create_player(
            self, new_player: PlayerIn, user_id: str
    ) -> PlayerOut:
        return PlayerOut(
            user_id="0b00da19-4846-451e-b1ef-bbf72de17cd4",
            profile_picture=new_player.profile_picture,
            email=new_player.email,
            first_name=new_player.first_name,
            last_name=new_player.last_name,
            city=new_player.city,
            state=new_player.state,
            about_me=new_player.about_me,
            birthdate=new_player.birthdate,
            is_verified=new_player.is_verified,
            is_gamehost=new_player.is_gamehost,
            gamehost_id=new_player.gamehost_id,
            is_playtester=new_player.is_playtester,
            playtester_id=new_player.playtester_id,
            is_developer=new_player.is_developer,
            developer_id=new_player.developer_id,
            is_player=new_player.is_player,
            player_id=user_id,
            tags=new_player.tags,
            lat=new_player.lat,
            lon=new_player.lon,
            location_radius=new_player.location_radius
        )


def test_create_player():
    # Arrange
    app.dependency_overrides[try_get_jwt_user_data] = JwtUserData
    app.dependency_overrides[PlayerQueries] = TestCreatePlayerQueries

    json_data = {
        "user_id": "0b00da19-4846-451e-b1ef-bbf72de17cd4",
        "profile_picture": "/player-icons/board-buddies-icon-test",
        "email": "test@example.com",
        "first_name": "Test",
        "last_name": "McTestson",
        "city": "Testville",
        "state": "ST",
        "about_me": "Test",
        "birthdate": "2024-01-01",
        "is_verified": True,
        "is_gamehost": True,
        "gamehost_id": 0,
        "is_playtester": True,
        "playtester_id": 0,
        "is_developer": True,
        "developer_id": 0,
        "is_player": True,
        "player_id": "0b00da19-4846-451e-b1ef-bbf72de17cd4",
        "tags": "Test",
        "lat": 0.0,
        "lon": 0.0,
        "location_radius": 0
    }

    expected = {
        "user_id": "0b00da19-4846-451e-b1ef-bbf72de17cd4",
        "profile_picture": "/player-icons/board-buddies-icon-test",
        "email": "test@example.com",
        "first_name": "Test",
        "last_name": "McTestson",
        "city": "Testville",
        "state": "ST",
        "about_me": "Test",
        "birthdate": "2024-01-01",
        "is_verified": True,
        "is_gamehost": True,
        "gamehost_id": 0,
        "is_playtester": True,
        "playtester_id": 0,
        "is_developer": True,
        "developer_id": 0,
        "is_player": True,
        "player_id": "0b00da19-4846-451e-b1ef-bbf72de17cd4",
        "tags": "Test",
        "lat": 0.0,
        "lon": 0.0,
        "location_radius": 0
    }

    # Act
    response = client.post("api/players/", json=json_data)

    # Clean Up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == expected


class TestUpdatePlayerQueries:

    def update(
        self, player_id: str, player: PlayerIn, user_id: str
    ) -> PlayerOut:
        if player_id == "0b00da19-4846-451e-b1ef-bbf72de17cd4":
            return PlayerOut(
                user_id="0b00da19-4846-451e-b1ef-bbf72de17cd4",
                profile_picture="/player-icons/board-buddies-icon-test",
                email="test@example.com",
                first_name="Test",
                last_name="McTestson",
                city="Testville",
                state="ST",
                about_me="Test",
                birthdate="2024-01-01",
                is_verified="true",
                is_gamehost="true",
                gamehost_id=0,
                is_playtester="true",
                playtester_id=0,
                is_developer="true",
                developer_id=0,
                is_player="true",
                player_id="0b00da19-4846-451e-b1ef-bbf72de17cd4",
                tags="Test",
                lat=0,
                lon=0,
                location_radius=0
            )
        None


def test_update_player():
    # Arrange
    app.dependency_overrides[try_get_jwt_user_data] = JwtUserData
    app.dependency_overrides[PlayerQueries] = TestUpdatePlayerQueries

    json_data = {
        "user_id": "0b00da19-4846-451e-b1ef-bbf72de17cd4",
        "profile_picture": "/player-icons/board-buddies-icon-test",
        "email": "test@example.com",
        "first_name": "Test",
        "last_name": "McTestson",
        "city": "Testville",
        "state": "ST",
        "about_me": "Test",
        "birthdate": "2024-01-01",
        "is_verified": True,
        "is_gamehost": True,
        "gamehost_id": 0,
        "is_playtester": True,
        "playtester_id": 0,
        "is_developer": True,
        "developer_id": 0,
        "is_player": True,
        "player_id": "0b00da19-4846-451e-b1ef-bbf72de17cd4",
        "tags": "Test",
        "lat": 0.0,
        "lon": 0.0,
        "location_radius": 0
    }

    expected = {
        "user_id": "0b00da19-4846-451e-b1ef-bbf72de17cd4",
        "profile_picture": "/player-icons/board-buddies-icon-test",
        "email": "test@example.com",
        "first_name": "Test",
        "last_name": "McTestson",
        "city": "Testville",
        "state": "ST",
        "about_me": "Test",
        "birthdate": "2024-01-01",
        "is_verified": True,
        "is_gamehost": True,
        "gamehost_id": 0,
        "is_playtester": True,
        "playtester_id": 0,
        "is_developer": True,
        "developer_id": 0,
        "is_player": True,
        "player_id": "0b00da19-4846-451e-b1ef-bbf72de17cd4",
        "tags": "Test",
        "lat": 0.0,
        "lon": 0.0,
        "location_radius": 0
    }

    # Act
    response = client.put(
        "api/players/0b00da19-4846-451e-b1ef-bbf72de17cd4",
        json=json_data
    )

    # Clean Up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == expected


class TestGetPlayerList:

    def get_all(self) -> Optional[List[PlayerOut]]:
        return [
            PlayerOut(
                user_id="0b00da19-4846-451e-b1ef-bbf72de17cd4",
                profile_picture="/player-icons/board-buddies-icon-test",
                email="test@example.com",
                first_name="Test",
                last_name="McTestson",
                city="Testville",
                state="ST",
                about_me="Test",
                birthdate="2024-01-01",
                is_verified="true",
                is_gamehost="true",
                gamehost_id=0,
                is_playtester="true",
                playtester_id=0,
                is_developer="true",
                developer_id=0,
                is_player="true",
                player_id="0b00da19-4846-451e-b1ef-bbf72de17cd4",
                tags="Test",
                lat=0,
                lon=0,
                location_radius=0
            )
        ]


def test_get_all_players():
    # Arange
    app.dependency_overrides[PlayerQueries] = TestGetPlayerList

    # Act
    response = client.get("/api/players/")

    # Clean up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == [
        {
            "user_id": "0b00da19-4846-451e-b1ef-bbf72de17cd4",
            "profile_picture": "/player-icons/board-buddies-icon-test",
            "email": "test@example.com",
            "first_name": "Test",
            "last_name": "McTestson",
            "city": "Testville",
            "state": "ST",
            "about_me": "Test",
            "birthdate": "2024-01-01",
            "is_verified": True,
            "is_gamehost": True,
            "gamehost_id": 0,
            "is_playtester": True,
            "playtester_id": 0,
            "is_developer": True,
            "developer_id": 0,
            "is_player": True,
            "player_id": "0b00da19-4846-451e-b1ef-bbf72de17cd4",
            "tags": "Test",
            "lat": 0.0,
            "lon": 0.0,
            "location_radius": 0
        }
    ]


class TestGetPlayerDetails:

    def details(self, player_id: str) -> Optional[PlayerOut]:
        if player_id == "0b00da19-4846-451e-b1ef-bbf72de17cd4":
            return PlayerOut(
                user_id="0b00da19-4846-451e-b1ef-bbf72de17cd4",
                profile_picture="/player-icons/board-buddies-icon-test",
                email="test@example.com",
                first_name="Test",
                last_name="McTestson",
                city="Testville",
                state="ST",
                about_me="Test",
                birthdate="2024-01-01",
                is_verified="true",
                is_gamehost="true",
                gamehost_id=0,
                is_playtester="true",
                playtester_id=0,
                is_developer="true",
                developer_id=0,
                is_player="true",
                player_id="0b00da19-4846-451e-b1ef-bbf72de17cd4",
                tags="Test",
                lat=0,
                lon=0,
                location_radius=0
            )
        return None


def test_get_player_details():
    # Arrange
    app.dependency_overrides[PlayerQueries] = TestGetPlayerDetails

    # Act
    response = client.get("/api/players/0b00da19-4846-451e-b1ef-bbf72de17cd4")

    # Clean Up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == {
        "user_id": "0b00da19-4846-451e-b1ef-bbf72de17cd4",
        "profile_picture": "/player-icons/board-buddies-icon-test",
        "email": "test@example.com",
        "first_name": "Test",
        "last_name": "McTestson",
        "city": "Testville",
        "state": "ST",
        "about_me": "Test",
        "birthdate": "2024-01-01",
        "is_verified": True,
        "is_gamehost": True,
        "gamehost_id": 0,
        "is_playtester": True,
        "playtester_id": 0,
        "is_developer": True,
        "developer_id": 0,
        "is_player": True,
        "player_id": "0b00da19-4846-451e-b1ef-bbf72de17cd4",
        "tags": "Test",
        "lat": 0,
        "lon": 0,
        "location_radius": 0
    }
