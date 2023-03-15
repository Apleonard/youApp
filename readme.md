1. to run this app you need to install docker machine on your device
2. to install dependencies you need to install docker-compose, after that just `docker-compose up -d`
3. cd consumer
4. `docker build -t you-app-consumer`
5. `docker run -p 4000:4000 you-app-consumer`
6. cd ../consumer
7. `docker build -t you-app-todo`
8. `docker run -p 3000:3000 you-app-todo`
9. to test the app you need to install postman
10. create new websocket request, change type to socket.io, connect to localhost:4000, and add listener `message`
11. last hit this curl

```
curl --location --request POST 'http://localhost:3000/todos' \
--header 'Content-Type: application/json' \
--data-raw '{
    "text": "iwiwiw",
    "completed": false
}'
```
