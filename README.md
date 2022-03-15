# Halliu
Prerequisite: `Docker and Installed Docker Compose` and make sure port `443` and `80` are available.  

## Run it (non development)
1. Clone this repository
2. Make this repository as active directory
3. Run this command `docker-compose up -d`
4. Open `https://localhost` on your browser
5. To turn off all the service run `docker-compose down --rmi all`

## Run it (development)
### 1st Method
1. Clone this repository
2. Make this repository as active directory
3. Run `cd backend && npm install -f && cd .. && cd frontend && npm install`
3. Run this command `docker-compose -f docker-compose.dev.yml up -d`.  
**NOTE**: If you're on windows please copy and paste this on your windows terminal `COMPOSE_CONVERT_WINDOWS_PATHS=1`
4. Open `https://localhost` on your browser
5. To turn off all the service run `docker-compose -f docker-compose.dev.yml down`

### 2nd Method
Pre-requisite: `make` is installed
1. Clone this repository
2. Make this repository as active directory
3. Run `make dev-docker-up`
4. To turn off all service run `make dev-docker-down`

### To see logs in realtime
If you're in development mode, you would like to see the logs in realtime in your terminal right?  
Run this command to get realtime logs:  
```
docker logs --follow [containerID]
```

## API Docs
Postman: https://www.postman.com/gits-crud-auth/workspace/halliu
