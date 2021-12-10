# islands-bitmap
This app will randomize width x height matrix and will draw it on the screen. <br>
Furthermore, you can find how many islands the random matrix has by pressing solve.<br>

## Stack
### Backend

- API
  - NodeJS
  - Express
- Proxy
  - NGINX

### Frontend

- Web
  - React

### Deployment

- Technologies
  - Docker
  - Docker compose

## Swagger API
[Islands Bitmap Swagger API](https://app.swaggerhub.com/apis-docs/ravid-eliyahu/islands-bitmap/1.0.0)

## Setup and Running

- Prerequisites

  - git
  - Node (`v10.x`)
  - Docker
  - Docker Compose

## Option 1 - Run Server & Client manually
### 1. Clone repository 
```
git clone https://github.com/RavidEliyahu/islands-bitmap.git
cd islands-bitmap
```
### 2. Setup Express Server
Install the project's dependencies using `npm` and then start the application.
```
cd server
npm install
npm run start
```
To test the Express server, browse to the URL [http://localhost:5000/](http://localhost:5000/).

### 3. Setup React Client
Open a second terminal and type:
```
cd client
```
In the project directory, run:
```
npm install
```
Then type:
```
npm run start
```
Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Option 2 - Run with Docker & Docker Compose
### 1. Clone repository 
```
git clone https://github.com/RavidEliyahu/islands-bitmap.git
cd islands-bitmap
```
### 2. Run Docker Compose
```
docker-compose up -d --build server client
```
When it finish building you can access the client via browser: [http://localhost:3000](http://localhost:3000)
### 3. More Docker commands
For server logs you can use:
```
docker logs -f server
```
Don't forget to terminate the session after you finished using it with:
```
docker-compose down
```

## A Quick Look
<img width="363" alt="Screen Shot 2021-12-10 at 3 31 42" src="https://user-images.githubusercontent.com/46108499/145502115-f9a69835-7a74-426a-8a2c-c9dd781dd4c6.png"><br>

<img width="363" alt="Screen Shot 2021-12-10 at 3 32 25" src="https://user-images.githubusercontent.com/46108499/145502157-2a873d41-10e1-46e2-80ff-bdfbfa80b8dd.png">

