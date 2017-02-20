# React Starter

Simple starter project including both React app and Express Rest API server

## What’s Inside?

* Rest API Express Server
    * Mongo DB
    * DB Seeding
    * Auth using JWT
    * Logging
    * Env variables using .env
    * Cors, Compression, Helmet
* React Starter
    * Auth using JWT
    * Redux (thunk, call-api-middleware, logger, Reselect)
    * Bootstrap 3, Font Awesome
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
rm -rf .git
git init
```

This project uses [dotenv](https://www.npmjs.com/package/dotenv) for setting environmental variables during development. Simply copy `.env.example` in both ``/backend`` and ``/client``, rename it to `.env` and add your env vars as you see fit.

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
cd backend
heroku login
heroku create my-app
git init
heroku git:remote -a my-app
git add .
git commit -am "initial commit"
git push heroku master
```

## Login credentials

### Admin

* username: `admin@example.com`
* password: `password`

### User

* username: `user@example.com`
* password: `password`
