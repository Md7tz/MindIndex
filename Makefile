.DEFAULT_GOAL := help
.PHONY: start log interact stop restart clean migrate rollback seed help

DFLAGS := --verbose --detach --renew-anon-volumes --file docker-compose.yml
DEXEC := docker exec -it app
PROJECT_NAME := $(shell basename $(CURDIR))

define HELP
Manage $(PROJECT_NAME) Usage:
endef
export HELP

help: # Show available commands/flags (DEFAULT COMMAND)
	@echo "$$HELP"
	@egrep -h '\s#\s' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?# "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

start: # Start the application
	docker compose up $(DFLAGS)

log: # Print node logs into terminal stdout session
	docker compose logs -f app

stop: # Stop the application
	docker compose down

restart: # Restart the application
	docker compose restart app

interact: # Interact with the node
	$(DEXEC) sh

clean: # Remove all containers and images
	docker compose down --rmi all --volumes

migrate: # Run knex migrations
	$(DEXEC) npx knex migrate:latest --env=docker

rollback: # Rollback knex migrations
	$(DEXEC) npx knex migrate:rollback --env=docker

seed: # Run knex seeds
	$(DEXEC) npx knex seed:run --env=docker