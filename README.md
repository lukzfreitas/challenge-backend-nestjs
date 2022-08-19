# Project Alura Challenge Backend 4 in NestJS 🐱

## 1. Getting started
Before starting, make sure you have at least those components on your workstation

- [NodeJs](https://nodejs.org/) and NPM
- Database [Mongodb](https://www.mongodb.com/)

### 1.2 Project configuration

Start by cloning this project in your workstation

``` sh
git clone https://github.com/lukzfreitas/challenge-backend-nestjs
```
The next thing, you'll need install all dependencies of the the project

``` sh
npm install
```

After install all dependencies, you can now configure enviroments variable, to do this you need create a file .env with variables below

``` sh
MONGODB_DB_URI = <YOUR_URL_DATABASE_MONGODB>
JWT_SECRECT_KEY = <YOUR_SECRET_KEY>;
```

### 1.2 Launch application server

If you followed steps previous so you're ready to run your application using the command below

``` sh
npm run start:dev
```

Now you can access swagger and see all endpoint available to you in [api](localhost:3000/api). All endpoint is protected by authorization using lib passport. You need create a user and catch up token in body response and then set header in endpoint that you want use as such example below

To create a new user http://localhost:3000/user

Request
``` sh
POST /users HTTP/1.1
Host: localhost:3000
Content-Type: application/json
{
    "username": <YOUR_USERNAME>,
    "password": <YOUR_PASSWORD>
    "email": <YOUR_EMAIL>
}
```

And login http://localhost:3000/login

``` sh
POST /login HTTP/1.1
Host: localhost:3000
Content-Type: application/json
{
    "username": <YOUR_USERNAME>,
    "password": <YOUR_PASSWORD>
}
```
Response
``` sh
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

So you can pass by parameter in the endpoint localhost:3000/expense Bearer authetication such as exemple below


``` sh
GET /expense HTTP/1.1
Host: localhost:3000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

## 2. Project structure

In construction soon more details...

## 3. Project goals

The goal of this project is improvement my skills such as backend developer using framework NestJs and share my knowledge with another developers.

## 4. Roadmap

The following improvements are currently in progress : 

- [x] Implementation API REST
- [x] Implementation new features 
- [x] Security and deploy API
- [ ] Project structure documentation
- [ ] Discovery more improvements

## 5. Contributing

Fell free to suggest an improvement, report a bug, or ask me something [https://github.com/lukzfreitas/challenge-backend-nestjs/issues](https://github.com/lukzfreitas/challenge-backend-nestjs/issues)