# Livestreaming Prototype

Prerequisite: `Docker and Installed Docker Compose` and make sure port `443` and `80` are available.  

## Run it (non development)
1. Clone this repository
2. Make this repository as active directory
3. Run this command `docker-compose up -d`
4. Open `https://localhost` on your browser
5. To turn off all the service run `docker-compose down --rmi all`

## Run it (development)
1. Clone this repository
2. Make this repository as active directory
3. Run this command `docker-compose -f docker-compose.dev.yml up -d`. **NOTE**: If you're on windows please copy and paste this on your windows terminal `COMPOSE_CONVERT_WINDOWS_PATHS=1`
4. Open `https://localhost` on your browser
5. To turn off all the service run `docker-compose -f docker-compose.dev.yml down`