include .env

setup:
	@make build
	@make up

build:
	docker compose build --no-cache --force-rm
up:
	docker compose up -d --no-build
down:
	docker compose down --remove-orphans
exec:
	docker exec -it $(CONTAINER_NAME) sh
logs:
	docker logs $(CONTAINER_NAME) -f
