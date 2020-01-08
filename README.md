# block-explorer

> Simple Kovan Test-Net Explorer Node/Mongo app

> Indexes transactions in mongodb which can be queried by sender's address via an API

## Quick Start

```bash
# Run in Docker
docker-compose up
# use -d flag to run in background

# Tear down
docker-compose down

# To be able to edit files, add volume to compose file
volumes: ['./:/usr/src/app']

# To re-build
docker-compose build
```

## Environment

> Create a .env file and input Api Key and the number of blocks to be synced with database

```
API_URL=kovan.infura.io/v3/b8fec784f3f54f3fa95ab878b54cfde7
BLOCK_LIMIT=10000

```

## APIs

> Will update after testing the APIs
