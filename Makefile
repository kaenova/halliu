# Used for creating docker stack for development
dev-docker-up: update-dep-linux
ifeq ($(OS), Windows_NT)
	COMPOSE_CONVERT_WINDOWS_PATHS=1
endif
	docker-compose -f docker-compose.dev.yml up -d

# Used for removing docker stack for development
dev-docker-down:
	docker-compose -f docker-compose.dev.yml down

dev-docker-down-rmi:
	docker-compose -f docker-compose.dev.yml down --rmi all

# Used for updating dependencies on every services
update-dep-linux:
	cd backend && npm install -f --target_platform=linux
	cd frontend && npm install -f --target_platform=linux

update-dep-local:
ifneq ($(OS), Linux)
	make clear-node-modules
endif
	cd backend && npm install -f 
	cd frontend && npm install -f 

# Deleting all node modules
clear-node-modules:
	cd backend && rm -rf node_modules
	cd frontend && rm -rf node_modules