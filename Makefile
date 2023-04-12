.PHONY: start log interact stop restart

start:
	docker-compose up -d

log: # Print node logs into terminal stdout session
	docker logs app --follow

stop:
	docker-compose down

restart:
	docker-compose restart app

interact: # Interact with the node
	docker exec -it app sh

clean: # Remove all containers and images
	docker-compose down --rmi all --volumes

migrate: # Run knex migrations
	docker exec -it app knex migrate:latest

