# Data Models

### JWTUserData Model
| Name     | Type | Unique | Optional |
|----------|------|--------|----------|
| user_id  | str  | Yes    | No       |
| username | str  | Yes    | No       |

### JWTPayload Model
| Name | Type        | Unique | Optional |
|------|-------------|--------|----------|
| user | JWTUserData | No     | No       |
| sub  | str         | No     | No       |
| exp  | int         | No     | No       |

### UserRequest Model
| Name        | Type     | Unique | Optional |
|-------------|----------|--------|----------|
| username    | str      | Yes    | No       |
| password    | str      | No     | No       |
| is_developer| bool     | No     | Yes      |
| is_player   | bool     | No     | Yes      |
| date_joined | datetime | No     | Yes      |

### UserResponse Model
| Name        | Type     | Unique | Optional |
|-------------|----------|--------|----------|
| user_id     | str      | Yes    | No       |
| username    | str      | Yes    | No       |
| is_developer| bool     | No     | Yes      |
| is_player   | bool     | No     | Yes      |
| date_joined | datetime | No     | Yes      |

### UserWithPw Model
| Name        | Type     | Unique | Optional |
|-------------|----------|--------|----------|
| user_id     | str      | Yes    | No       |
| username    | str      | Yes    | No       |
| password    | str      | No     | No       |
| is_developer| bool     | No     | Yes      |
| is_player   | bool     | No     | Yes      |
| date_joined | datetime | No     | Yes      |

### PlayerIn Model
| Name            | Type     | Unique | Optional |
|-----------------|----------|--------|----------|
| profile_picture | str      | No     | Yes      |
| email           | EmailStr | Yes    | Yes      |
| first_name      | str      | No     | Yes      |
| last_name       | str      | No     | Yes      |
| city            | str      | No     | Yes      |
| state           | str      | No     | Yes      |
| about_me        | str      | No     | Yes      |
| birthdate       | date     | No     | Yes      |
| is_verified     | bool     | No     | Yes      |
| is_gamehost     | bool     | No     | Yes      |
| gamehost_id     | int      | No     | Yes      |
| is_playtester   | bool     | No     | Yes      |
| playtester_id   | int      | No     | Yes      |
| is_developer    | bool     | No     | Yes      |
| developer_id    | int      | No     | Yes      |
| is_player       | bool     | No     | Yes      |
| tags            | str      | No     | Yes      |
| lat             | float    | No     | Yes      |
| lon             | float    | No     | Yes      |
| location_radius | int      | No     | Yes      |

### PlayerOut Model
| Name            | Type     | Unique | Optional |
|-----------------|----------|--------|----------|
| user_id         | str      | Yes    | No       |
| profile_picture | str      | No     | Yes      |
| email           | EmailStr | Yes    | Yes      |
| first_name      | str      | No     | Yes      |
| last_name       | str      | No     | Yes      |
| city            | str      | No     | Yes      |
| state           | str      | No     | Yes      |
| about_me        | str      | No     | Yes      |
| birthdate       | date     | No     | Yes      |
| is_verified     | bool     | No     | Yes      |
| is_gamehost     | bool     | No     | Yes      |
| gamehost_id     | int      | No     | Yes      |
| is_playtester   | bool     | No     | Yes      |
| playtester_id   | int      | No     | Yes      |
| is_developer    | bool     | No     | Yes      |
| developer_id    | int      | No     | Yes      |
| is_player       | bool     | No     | Yes      |
| player_id       | str      | Yes    | Yes      |
| tags            | str      | No     | Yes      |
| lat             | float    | No     | Yes      |
| lon             | float    | No     | Yes      |
| location_radius | int      | No     | Yes      |

### GameIn Model
| Name          | Type | Unique | Optional |
|---------------|------|--------|----------|
| name          | str  | Yes    | No       |
| game_image    | str  | No     | Yes      |
| min_players   | int  | No     | No       |
| max_players   | int  | No     | No       |
| game_duration | int  | No     | No       |
| min_age       | int  | No     | No       |
| max_age       | int  | No     | Yes      |
| tags          | str  | No     | No       |
| description   | str  | No     | No       |

### GameOut Model
| Name          | Type | Unique | Optional |
|---------------|------|--------|----------|
| id            | int  | Yes    | No       |
| name          | str  | Yes    | No       |
| game_image    | str  | No     | Yes      |
| min_players   | int  | No     | No       |
| max_players   | int  | No     | No       |
| game_duration | int  | No     | No       |
| min_age       | int  | No     | No       |
| max_age       | int  | No     | Yes      |
| tags          | str  | No     | No       |
| description   | str  | No     | No       |

### LocationIn Model
| Name       | Type | Unique | Optional |
|------------|------|--------|----------|
| name       | str  | No     | No       |
| address    | str  | No     | No       |
| city       | str  | No     | No       |
| state      | str  | No     | No       |
| store_type | str  | No     | No       |

### LocationOut Model
| Name       | Type | Unique | Optional |
|------------|------|--------|----------|
| id         | int  | Yes    | No       |
| name       | str  | No     | No       |
| address    | str  | No     | No       |
| city       | str  | No     | No       |
| state      | str  | No     | No       |
| store_type | str  | No     | No       |

### MeetupIn Model
| Name        | Type     | Unique | Optional |
|-------------|----------|--------|----------|
| meetup_name | str      | No     | No       |
| game_id     | int      | No     | No       |
| location_id | int      | No     | No       |
| start_time  | datetime | No     | No       |
| end_time    | datetime | No     | No       |
| description | str      | No     | No       |
| min_players | int      | No     | No       |
| max_players | int      | No     | No       |
| status      | str      | No     | Yes      |

### MeetupOut Model
| Name               | Type     | Unique | Optional |
|--------------------|----------|--------|----------|
| id                 | int      | Yes    | No       |
| meetup_name        | str      | No     | No       |
| organizer_id       | str      | No     | No       |
| organizer_username | str      | No     | No       |
| organizer_picture  | str      | No     | Yes      |
| game_name          | str      | No     | No       |
| game_image         | str      | No     | Yes      |
| location_name      | str      | No     | No       |
| location_address   | str      | No     | No       |
| location_city      | str      | No     | No       |
| location_state     | str      | No     | No       |
| location_store_type| str      | No     | No       |
| start_time         | datetime | No     | No       |
| end_time           | datetime | No     | No       |
| description        | str      | No     | No       |
| min_players        | int      | No     | No       |
| max_players        | int      | No     | No       |
| status             | str      | No     | No       |

### ParticipantOut Model
| Name            | Type | Unique | Optional |
|-----------------|------|--------|----------|
| participant_id  | str  | Yes    | No       |
| username        | str  | No     | No       |
| profile_picture | str  | No     | Yes      |

### MeetupDetailsOut Model
| Name        | Type             | Unique | Optional |
|-------------|------------------|--------|----------|
| meetup      | MeetupOut        | No     | No       |
| participants| List[ParticipantOut] | No     | No       |

