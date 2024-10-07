## Project Documentation

# Board Buddies
Board Buddies is the premiere matchmaking site for board gamers. It allows new users to sign up as 'players' and search for meetups to join or create their own board game meetups for others to participate in. Whether you're looking to find fellow gamers for a casual night or set up your own event, Board Buddies makes connecting with the board game community easy and fun.

## Features
- User registration for 'players.'
- Dashboard with links to accessible pages.
- Search for board game meetups.
- Filtered list of meetups for organizers and participants.
- Create and manage board game meetups.
- Join existing meetups organized by others.
- User roles management ('players' and 'organizers') for a tailored experience.

## Tech Stack
- Frontend: React, Bootstrap
- Backend: FastAPI
- Database: PostgreSQL
- Authentication: JWT-based authentication
- Integrations: GoogleMapsAPI

## Future Roadmap
- Add 'complete' meetup button and archive to 'Past Meetups'.
- Add new user roles, such as 'game developers' and 'playtesters'.
- Implement ratings and reviews for meetups.
- Ability to match players to games via tags.
- Ability to match player to player (as 'game buddies').
- Implement a buddy list and chat feature
- Landing page features available meetups in user's area.
- Enhance search functionality with filters (e.g., game type, location).
- Integration with board game databases for automated meetup suggestions.

## Getting Started
In your terminal:
1. Clone the repository down to your local machine
2. CD into the new project directory
4. Run ``docker volume create database_volume``
5. Run ``docker compose build``
6. Run ``docker compose up``

## Design
1. [API Design](docs/api-design.md)

2. [Data Model](docs/data-models.md)

3. [GHI (Graphical User Interface)](docs/ghi.md)
