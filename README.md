# React Starter

Simple starter project including both React app and Express Rest API server

## What’s Inside?

* Rest API Express Server
    * Mongo DB
    * DB Seeding
    * Auth with JWT
    * Logging
    * Env variables using .env
    * Cors, Compression, Helmet..
    * PM2
* React Starter
    * Auth using JWT
    * Redux (thunk, call-api-middleware, logger)
    * Bootstrap 3
    * react-router
    * loader
    * toast / alert
    * form validation
    * [forked create-react-app](https://github.com/Kamahl19/create-react-app/tree/kamahl19-customizations/packages/react-scripts)

## Getting Started With create-react-app

### Installation

Clone this repository:

```sh
git clone https://github.com/Kamahl19/react-starter my-app
cd my-app
```

Set Enviroment Variables
```
create .env file using the .env.example file
```

Seed DB & Start the backend

```sh
cd backend
yarn install
yarn run seed
yarn start
```

Start the client

```sh
cd client
yarn install
yarn start
```

## Deployment

Build client
```sh
cd client
yarn run build
```

Deploy app to Heroku
```sh
TODO
```

## Login credentials

### Admin

* username: `admin@example.com`
* password: `password`

### User

* username: `user@example.com`
* password: `password`
