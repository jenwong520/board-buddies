"""
Unit Tests for main CRUD operations for Users
"""

from main import app
from fastapi.testclient import TestClient
from queries.user_queries import UserQueries
from models.users import UserResponse, UserRequest, UserUpdate
from typing import List, Optional


client = TestClient(app)


def test_init():
    """
    Unit-Test Base Case
    """
    assert 1 == 1


class TestGetUserByUsernameQueries:
    """
    Unit-Test [GET] user by username
    """

    def get_by_username(self, username: str) -> Optional[UserResponse]:
        if username == "testuser":
            return UserResponse(
                username="testuser",
                first_name="Test",
                last_name="User",
                email="testuser@example.com",
                user_id=1,
            )
        return None


def test_get_user_by_username():
    app.dependency_overrides[UserQueries] = TestGetUserByUsernameQueries

    response = client.get("/users/testuser")
    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == {
        "username": "testuser",
        "first_name": "Test",
        "last_name": "User",
        "email": "testuser@example.com",
        "user_id": 1,
    }


class TestGetUserByIdQueries:
    """
    Unit-Test [GET] user by ID
    """

    def get_by_id(self, user_id: int) -> Optional[UserResponse]:
        if user_id == 1:
            return UserResponse(
                username="testuser",
                first_name="Test",
                last_name="User",
                email="testuser@example.com",
                user_id=1,
            )
        return None


def test_get_user_by_id():
    app.dependency_overrides[UserQueries] = TestGetUserByIdQueries

    response = client.get("/users/id/1")
    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == {
        "username": "testuser",
        "first_name": "Test",
        "last_name": "User",
        "email": "testuser@example.com",
        "user_id": 1,
    }


class TestCreateUserQueries:
    """
    Unit-Test [POST] create user
    """

    def create_user(
        self, new_user: UserRequest, hashed_password: str
    ) -> UserResponse:
        return UserResponse(
            username=new_user.username,
            first_name=new_user.first_name,
            last_name=new_user.last_name,
            email=new_user.email,
            user_id=1,
        )


def test_create_user():
    app.dependency_overrides[UserQueries] = TestCreateUserQueries

    json_data = {
        "username": "newuser",
        "password": "password123",
        "first_name": "New",
        "last_name": "User",
        "email": "newuser@example.com",
    }
    expected = {
        "username": "newuser",
        "first_name": "New",
        "last_name": "User",
        "email": "newuser@example.com",
        "user_id": 1,
    }

    response = client.post("/users", json=json_data)
    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == expected


class TestListAllUsersQueries:
    """
    Unit-Test [GET] all users
    """

    def list_all_users(self) -> List[UserResponse]:
        return [
            UserResponse(
                username="testuser",
                first_name="Test",
                last_name="User",
                email="testuser@example.com",
                user_id=1,
            )
        ]


def test_list_all_users():
    app.dependency_overrides[UserQueries] = TestListAllUsersQueries

    response = client.get("/users")
    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == [
        {
            "username": "testuser",
            "first_name": "Test",
            "last_name": "User",
            "email": "testuser@example.com",
            "user_id": 1,
        }
    ]


class TestUpdateUserQueries:
    """
    Unit-Test [PUT] update user
    """

    def update_user(
        self, username: str, email: str, user_id: int
    ) -> UserUpdate:
        return UserUpdate(
            username=username,
            email=email,
        )


def test_update_user():
    app.dependency_overrides[UserQueries] = TestUpdateUserQueries

    json_data = {
        "username": "updateduser",
        "email": "updateduser@example.com",
    }
    expected = {
        "username": "updateduser",
        "email": "updateduser@example.com",
    }

    response = client.put("/users/1", json=json_data)
    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == expected
