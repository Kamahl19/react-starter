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

## Getting Started

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

Run `create-react-app` using [custom `react-scripts`](https://github.com/Kamahl19/create-react-app/tree/master/packages/react-scripts) customized for this starter:

```sh
create-react-app client --scripts-version react-scripts-kamahl19-fork
cd client
```

Remove `public` and `src` folders:

```sh
rm -rf public src
```

Copy `public` and `src` folders from `/frontend` folder into `/client` folder

Merge `frontend/package.json` to `client/package.json`:

1. use the content of `client/package.json`
2. use `dependencies` and `engines` from `frontend/package.json`

Install client dependencies

```sh
cd client
npm i
```

Run the backend

```sh
cd backend
npm i
npm start
```

Run the client

```sh
cd client
npm start
```

Download 

## User login

* username: `test@test.com`
* password: `password`
