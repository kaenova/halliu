# Halliu
**Prerequisite**: `Docker and Installed Docker Compose` and make sure port `443` and `80` are available.  
**Notes**: This certificate using a self-signed certificate. So if your browser gives you a nottification, you can just continue it.
  
This platforms are build with microservice architecture, thus we're using a Docker to help us run each nodes using container. The first time you spin this platform up will going to take a long time for it to build, so be patience because there's 2 big container and 2 small container with 1 AI nodes. That being said, the [AI nodes](https://github.com/kaenova/simple-spam-detector) are not in this repository because it will create a big container, therefore we move it to production server first and then hit the backend to that production server.

## Run it (Production)
1. Clone this repository
2. Make this repository as active directory
3. Run command `docker-compose up -d`
4. Open `https://localhost` on your browser
5. To turn off all the services run `docker-compose down --rmi all`

## Run it (development)
### 1st Method
1. Clone this repository
2. Make this repository as active directory
3. Run `cd backend && npm install -f && cd .. && cd frontend && npm install`
3. Run this command `docker-compose -f docker-compose.dev.yml up -d`.  
**NOTE**: If you're on windows please copy and paste this on your windows terminal `COMPOSE_CONVERT_WINDOWS_PATHS=1`
4. Open `https://localhost` on your browser
5. To turn off all the services run `docker-compose -f docker-compose.dev.yml down`

### 2nd Method (Easy and more Recommended)
Pre-requisite: `make` is installed
1. Clone this repository
2. Make this repository as active directory
3. Run `make dev-docker-up`
4. To turn off all services run `make dev-docker-down`

### To see logs in realtime
If you're in development mode, you would like to see the logs in realtime in your terminal right?  
Run this command to get realtime logs:  
```
docker logs --follow [containerID]
```

## API Docs
Postman: https://documenter.getpostman.com/view/20088411/UzBsHjao
