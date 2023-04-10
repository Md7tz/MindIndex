.PHONY: start stop restart

start:
	docker-compose up -d

log: # Print node logs into terminal stdout session
	docker logs app --follow

stop:
	docker-compose down

restart:
	docker-compose restart app
