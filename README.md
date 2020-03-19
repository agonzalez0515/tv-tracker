# TV Tracker

### Prerequisites

Docker

## Setup project

1. git clone git@github.com:agonzalez0515/tv-tracker.git
2. Create `.env` files in `server/` and add your variables.

`server/.env`

- DB_HOST
- DB_PASSWORD
- DB_PORT
- DB_USER
- DB_NAME
- TEST_DB_NAME
- JWT_SECRET

3. Run `docker-compose build`
4. After installation (can take a couple mins) run `docker-compose up`

Visit `localhost:3000` to see it locally!

### Setup database

Before we can do anything else, we need to setup the database.

1.  Run `docker ps` to find the container ID for the backend container.
2.  Run `docker exec CONTAINERID sh -c "npm run migrate"
3.  Run `docker exec CONTAINERID sh -c "npm run seed"

Now visit `localhost:3000/register` and you can create a new user!
