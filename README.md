# React Starter

Simple starter project including both React app and Express.js server for API

## What’s Inside?

* Auth using JWT
* Redux (thunk, call-api-middleware, logger)
* Bootstrap 3
* react-router
* loader
* toast / alert
* form validation

## Getting Started With create-react-app

If you dont want to use create-react-app, scroll down to [Getting Started Without create-react-app](#getting-started-without-create-react-app)

### Installation

Install `create-react-app` at first:

```sh
npm install -g create-react-app
```

Clone this repository:

```sh
git clone https://github.com/Kamahl19/react-starter my-app
cd my-app
```

Run `create-react-app` using [custom `react-scripts`](https://github.com/Kamahl19/create-react-app/tree/kamahl19-customizations/packages/react-scripts) customized for this starter:

```sh
create-react-app client --scripts-version react-scripts-kamahl19-fork
cd client
```

Remove `public` and `src` folders from `client` folder:

```sh
rm -rf public src
```

Copy `public` and `src` folders from `/frontend` folder into `/client` folder

Merge `frontend/package.json` to `client/package.json`:

1. use the content of `client/package.json`
2. use `dependencies` and `engines` from `frontend/package.json`

Remove the frontend

```sh
cd ../
rm -rf frontend
```

Run the client

```sh
cd client
npm i
npm start
```

Run the backend

```sh
cd backend
npm i
npm start
```

## User login

* username: `test@test.com`
* password: `password`

## Getting Started Without create-react-app

Clone this repository and add your own webpack solution

```sh
git clone https://github.com/Kamahl19/react-starter my-app
cd my-app
```
