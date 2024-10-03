from main import app
from fastapi.testclient import TestClient
from queries.location_queries import LocationQueries
from models.locations import LocationIn, LocationOut, LocationList
from typing import List, Optional


client = TestClient(app)


def test_init():
    assert 1 == 1


class TestGetLocationById:

    def get_by_id(self, id: int) -> Optional[LocationOut]:
        if id == 1:
            return LocationOut(
                id= 1,
                name="Turn Zero Games",
                address="3959 Wilshire Blvd ste a-9",
                city="Los Angeles",
                state="CA",
                store_type="Game Store"
            )
        return None


def test_get_user_by_id():
    app.dependency_overrides[LocationQueries] = TestGetLocationById

    response = client.get("/api/location/1")
    app.dependdency_overrides = {}

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

    def get_loctation_list(self) -> List[LocationList]:
        return [
            LocationList(
                id="1",
                name="Mythic Games"
            )
        ]


def test_post_request():
    # Arange
    app.dependency_overrides[LocationQueries] = TestGetLocationList
    # Act
    response = client.get("/api/location/")
    #Clean up
    app.dependency_overrides = {}
    # Assert
    assert response.status_code == 200
    assert response.json() == [
        {
            "id": 1,
            "name":"Mythic Games",
        }
    ]
