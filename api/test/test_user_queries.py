# Work in progress. Couldn't get working. Issues with paths in first
# two tests and datetime in second test.

# from datetime import datetime
# from main import app
# from fastapi.testclient import TestClient
# from queries.user_queries import UserQueries
# from models.users import UserResponse, UserRequest, UserWithPw
# from typing import List, Optional
# from utils.authentication import try_get_jwt_user_data
# from unittest.mock import patch


# client = TestClient(app)


# def JwtUserData():
#     return UserResponse(
#         user_id="0b00da19-4846-451e-b1ef-bbf72de17cd4",
#         username="Test_Person",
#         password="Test1111",
#         is_developer="true",
#         is_player="true",
#         date_joined=datetime
#     )


# def test_init():
#     assert 1 == 1


# class TestGetUserByUsernameQueries:
#     """
#     Unit-Test [GET] user by username
#     """

#     def get_by_username(self, username: str) -> Optional[UserWithPw]:
#         if username == "Test_Person":
#             return UserWithPw(
#                 user_id="0b00da19-4846-451e-b1ef-bbf72de17cd4",
#                 username="Test_Person",
#                 password="Test1111",
#                 is_developer="true",
#                 is_player="true",
#                 date_joined="2024-10-04T00:08:00.007Z",
#             )
#         return None


# def test_get_user_by_username():
#     # Arrange
#     app.dependency_overrides[try_get_jwt_user_data] = JwtUserData
#     app.dependency_overrides[UserQueries] = TestGetUserByUsernameQueries

#     # Act
#     response = client.get("/api/auth/signin")

#     # Clean Up
#     app.dependency_overrides = {}

#     # Assert
#     assert response.status_code == 200
#     assert response.json() == {
#         "user_id": "0b00da19-4846-451e-b1ef-bbf72de17cd4",
#         "username": "Test_Person",
#         "password": "Test1111",
#         "is_developer": True,
#         "is_player": True,
#         "date_joined": "2024-10-04T00:08:00.007Z",
#     }


# class TestGetUserByIdQueries:
#     """
#     Unit-Test [GET] user by ID
#     """

#     def get_by_id(self, user_id: int) -> Optional[UserWithPw]:
#         if user_id == "0b00da19-4846-451e-b1ef-bbf72de17cd4":
#             return UserWithPw(
#                 user_id="0b00da19-4846-451e-b1ef-bbf72de17cd4",
#                 username="Test_Person",
#                 password="Test1111",
#                 is_developer="true",
#                 is_player="true",
#                 date_joined="2024-10-04T00:08:00.007Z",
#             )
#         return None


# def test_get_user_by_id():
#     app.dependency_overrides[try_get_jwt_user_data] = JwtUserData
#     app.dependency_overrides[UserQueries] = TestGetUserByIdQueries

#     response = client.get("api/auth/signin")
#     app.dependency_overrides = {}

#     assert response.status_code == 200
#     assert response.json() == {
#         "user_id": "0b00da19-4846-451e-b1ef-bbf72de17cd4",
#         "username": "Test_Person",
#         "password": "Test1111",
#         "is_developer": True,
#         "is_player": True,
#         "date_joined": "2024-10-04T00:08:00.007Z",
#     }


# class TestCreateUserQueries:
#     """
#     Unit-Test [POST] create user
#     """

#     def create_user(
#             self,
#             username: str,
#             hashed_password: str,
#             is_developer: bool,
#             is_player: bool,
#             date_joined: datetime
#     ) -> UserWithPw:
#         return UserWithPw(
#             user_id="0b00da19-4846-451e-b1ef-bbf72de17cd4",
#             username=username,
#             password=hashed_password,
#             is_developer=is_developer,
#             is_player=is_player,
#             date_joined=date_joined,
#         )


# @patch('queries.user_queries.datetime')
# def test_create_user(mock_datetime):
#     # Arrange
#     fixed_datetime = datetime(2024, 10, 5, 0, 8, 3, 407000)
#     mock_datetime.now.return_value = fixed_datetime
#     mock_datetime.isoformat = lambda: fixed_datetime.isoformat()

#     app.dependency_overrides[try_get_jwt_user_data] = JwtUserData
#     app.dependency_overrides[UserQueries] = TestCreateUserQueries

#     json_data = {
#         "user_id": "0b00da19-4846-451e-b1ef-bbf72de17cd4",
#         "username": "Test_Person",
#         "password": "Test1111",
#         "is_developer": True,
#         "is_player": True,
#         "date_joined": fixed_datetime.isoformat(),
#     }
#     expected = {
#         "user_id": "0b00da19-4846-451e-b1ef-bbf72de17cd4",
#         "username": "Test_Person",
#         "is_developer": True,
#         "is_player": True,
#         "date_joined": fixed_datetime.isoformat(),
#     }

#     # Act
#     response = client.post("api/auth/signup", json=json_data)

#     #Clean Up
#     app.dependency_overrides = {}

#     # Assert
#     assert response.status_code == 200
#     assert response.json() == expected
