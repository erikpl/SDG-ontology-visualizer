# Installation / deployment guide

This document will mainly discuss how to deploy the project. For development purposes see the last section.

There are two ways to deploy the project, either with a remote database or hosting the database "locally".

## Requirements

To deploy this project you only need a version of docker which supports docker-compose files version >= 3.7

If you want to also deploy the database locally you will need one of the following:
- A distributable (zip) of GraphDB Free Edition ([get it here](https://www.ontotext.com/products/graphdb/graphdb-free/))
- A valid license for GraphDB [Standard Edition](https://www.ontotext.com/products/graphdb/graphdb-standard/) or [Enterprise Edition](https://www.ontotext.com/products/graphdb/graphdb-enterprise/)

For development you will also need NodeJS and yarn

## Remote database

If you already have a graphdb instance running on another server / container, you can deploy only the backend express server and the frontend files.

First clone the repository to where you want to deploy it, and copy the `.env.example` file in this directory to `.env` and fill in the following information:

- `GRAPHDB_BASE_URL`: The URL where your graphdb instance is hosted
- `GRAPHDB_REPOSITORY`: The name of the repository to use
- `GRAPHDB_USERNAME`: The username of a user that has access to the repository defined above
- `GRAPHDB_PASSWORD`: The password of the user defined above
- `DOMAIN`: The domain or subdomain where you will be hosting the application


Enter this directory on the commandline and run the command 
```console
docker-compose -f docker-compose.server.yml up -d
```

This will start the application in daemon-mode (running in the background), and route port 80 and 443 to the webserver.

## Local database

### Common setup

First clone the repository to the server you want to host the application on, and copy the `.env.example` file in the top level directory to `.env`. Then fill in the following information:

- `GRAPHDB_USERNAME`: The username of a user with access to the `TK_SDG` repository (you will create this user later)
- `GRAPHDB_PASSWORD`: The password of the user defined above
- `DOMAIN`: The domain or subdomain where you will be hosting the application

### Free GraphDB

For free distributions of graphdb fill in the following in `.env`:

- `GRAPHDB_EDITION`: `free`
- `GRAPHDB_VERSION`: The version of the distributable you downloaded, probably `9.10.1`
- `GRAPHDB_DOCKERFILE`: `graphdb.free.Dockerfile`

Now copy the distributable zip into `deployment/graphdb` and make sure it is named `graphdb-free-<your_version>-dist.zip`.

### Licensed GraphDB

For licensed editions of graphdb, fill in the following in `.env`:

- `GRAPHDB_EDITION`: `se` for Standard Edition or `ee` for Enterprise Edition
- `GRAPHDB_VERSION`: The version of graphdb you want to use, recommended `9.11.1`
- `GRAPHDB_DOCKERFILE`: `graphdb.license.Dockerfile`

Copy your GraphDB license file to `deployment/license/graphdb.license`

### Preloading data

To initialize the database with data, add the rdf-files (.rdf, .owl, .brf etc.) (e.g `statements.brf`) containing the data to the `backend/database/data` folder.

### Running the application

When you run the application, docker will create a directory called `graphdb_home` and mount it as a volume for persisting graphdb data. If the directory `graphdb_home/data/repositories/TK_SDG` does not exist, graphdb will preload all the data from `backend/database/data`.

To run the application, enter the top level directory and enter the command 
```console
docker-compose up -d --build
```

If this is the first time you run the application, the required graphdb-user will not exist, so the backend application will not be able to connect to graphdb, it will also not be able to connect if the preload process is running.

To fix this follow the following steps:
- In a web-browser, go to `$DOMAIN:7200` (`$DOMAIN` being the domain you specified in the `.env` file), e.g `localhost:7200`
- Go to the "Users and Access" page under "Setup" in the side-menu
- Create a new user with the parameters you set in `.env`
- You should also update the admin password from the default `root`
- Enable security
- Restart the backend-container with `docker-compose restart backend`

The application should now be accessible at the domain you specified in `.env`

## Development

When developing the project you usually want hot-reloading and tools attaching to your project dependencies. The easiest way to achieve this is to run the modules using the yarn development server.

You will first need to install and configure a graphdb instance, either locally or remotely. See the [GraphDB quickstart guide](https://graphdb.ontotext.com/documentation/free/quick-start-guide.html)

Also make sure that [node](https://nodejs.org) and [yarn](https://yarnpkg.com/getting-started) is installed on your system.

### Backend

To run the backend:
- Copy `backend/.env.example` to `backend/.env`
- Update `.env` with your configuration
    - `GRAPHDB_BASE_URL`: Where you can access graphdb; if you run graphdb locally this is `http://localhost:7200` by default
    - `GRAPHDB_REPOSITORY`: The name of the repository that hosts your data. If you created the repository from the `backend/database/conf/TK_SDG-config.ttl` config file the repository name will be `TK_SDG`
    - `GRAPHDB_USERNAME`: The username of a user with access to the repo. If you have not added any users, use the `admin` user
    - `GRAPHDB_PASSWORD`: The password for the user above. The default password for `admin` is `root`
- Enter the backend directory with the commandline
- Install the backend dependencies with the command `yarn`
- Run the backend application with `yarn start`

### Frontend
To run the frontend
- Copy `frontend/.env.example` to `frontend/.env`
- Ensure that the `REACT_APP_BACKEND_URL` variable points to your backend application; `http://localhost:3001/api` if no changes has been made
- Enter the frontend directory on the commandline
- Install the frontend dependencies with `yarn`
- Start the development server with `yarn start`
