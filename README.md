# block-explorer

> Simple Kovan Test-Net Explorer Node/Mongo app

Indexes transactions in mongodb which can be queried by sender's address via an API

### Purpose

Parsing a blockchain into a database for better response times in a production application (eg. Wallet)

### Approach

This blockchain explorer consumes pluggable API (API_URL in .env) from a service (here, Infura), and saves transactions to a MongoDB database.

### APIs

Four APIs are available. Two for developer and two for user.
```
https://localhost:80/dev/freshSync
```
> This API reads the BLOCK_LIMIT in .env file and stores all transactions from the last 'BLOCK_LIMIT' blocks to latest confirmed block. BLOCK_LIMIT is expected to be large and API is meant to be called once during setup.

```
https://localhost:80/dev/quickSync
```
> This API queries the database for the last block parsed and stores all transactions from that block to the latest block. QuickSync can be called at regular intervals to keep the database updated.

```
https://localhost:80/user/transactions/from/:from
```
> This API accepts the user's address and responds with all transactions made from that account

```
https://localhost:80/user/transactions/to/:to
```
> This API accepts the user's address and responds with all transactions made to that account

## Demo

Rough Demo video showing manual setup and all APIs working: https://www.youtube.com/watch?v=CO169aSBtTI

## Environment

> Create a .env file and input Api Key and the number of blocks to be synced with database

```
API_URL=kovan.infura.io/v3/b8fec784f3f54f3fa95ab878b54cfde7
BLOCK_LIMIT=10000

```
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

### Note

The server starts at port 80 using docker container and at port 3000 using manual setup.
