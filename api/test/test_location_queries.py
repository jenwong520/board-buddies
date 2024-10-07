from main import app
from fastapi import Response
from fastapi.testclient import TestClient
from queries.location_queries import LocationQueries
from models.locations import LocationIn, LocationOut
from typing import List, Optional


client = TestClient(app)


def test_init():
    assert 1 == 1


class TestGetLocationById:

    def details(self, id: int) -> Optional[LocationOut]:
        if id == 1:
            return LocationOut(
                id=1,
                name="Turn Zero Games",
                address="3959 Wilshire Blvd ste a-9",
                city="Los Angeles",
                state="CA",
                store_type="Game Store"
            )
        return None


def test_get_location_by_id():
    app.dependency_overrides[LocationQueries] = TestGetLocationById

    response = client.get("/api/location/1")
    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        "name": "Turn Zero Games",
        "address": "3959 Wilshire Blvd ste a-9",
        "city": "Los Angeles",
        "state": "CA",
        "store_type": "Game Store"
    }


class TestGetLocationList:

    def get_all(self) -> List[LocationOut]:
        return [
            LocationOut(
                id="1",
                name="Mythic Games",
                address="561 Tyler St",
                city="Monterey",
                state="CA",
                storetype="Game Store"
            )
        ]


def test_post_request():
    # Arange
    app.dependency_overrides[LocationQueries] = TestGetLocationList
    # Act
    response = client.get("/api/location/")
    # Clean up
    app.dependency_overrides = {}
    # Assert
    assert response.status_code == 200
    assert response.json() == [
        {
            "id": 1,
            "name": "Mythic Games",
        }
    ]


class TestCreateLocationQueries:

    def create_location(
            self, new_location: LocationIn
    ) -> LocationOut:
        return LocationOut(
            id=1,
            name=new_location.name,
            address=new_location.address,
            city=new_location.city,
            state=new_location.state,
            store_type=new_location.store_type
        )


def test_create_user():
    app.dependency_overrides[LocationQueries] = TestCreateLocationQueries

    json_data = {
        "name": "Mythic Games",
        "address": "527 Tyler St",
        "city": "Monterery",
        "state": "CA",
        "store_type": "Game Store"
    }

    expected = {
        "id": 1,
        "name": "Mythic Games",
        "address": "527 Tyler St",
        "city": "Monterery",
        "state": "CA",
        "store_type": "Game Store"
    }

    response = client.post("api/location/", json=json_data)
    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == expected


class TestUpdateLocationQueries:

    def update(
        self, id: int, response: Response
    ) -> LocationOut:
        if id == 1:
            return LocationOut(
                id=1,
                name="Mythic Games",
                address="527 Tyler St",
                city="Monterery",
                state="CA",
                store_type="Game Store"
            )
        None


def test_update_location():
    app.dependency_overrides[LocationQueries] = TestUpdateLocationQueries

    json_data = {
        "name": "Mythic Games",
        "address": "527 Tyler St",
        "city": "Monterery",
        "state": "CA",
        "store_type": "Game Store"
    }

    expected = {
        "id": 1,
        "name": "Mythic Games",
        "address": "527 Tyler St",
        "city": "Monterery",
        "state": "CA",
        "store_type": "Game Store"
    }

    response = client.put("api/location/1", json=json_data)
    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == expected
