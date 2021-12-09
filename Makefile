docker-build-server:
    docker-compose build server

docker-build-client:
    docker-compose build client

docker-run:
    docker-compose run -d client server

# docker-compose build server client
# docker logs client -f
# docker logs server -f
# docker ps
# docker kill server
# docker kill client
# docker-compose down
# docker-compose up -d --build client server
# docker exec -it server sh