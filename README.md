# GraphQL Project: GRAPHQL SERVER LEARNING

This GraphQL project provides an API to query data mutation and other method comes under graphql.

## Overview

The GraphQL server build to learn working of graphQL server.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Examples](#examples)
- [License](#license)

## Installation

To get started with the Movie Database API, follow these steps:

1. Clone the repository:
```bash
git clone https://github.com/Suraj-AM/graphQL
cd graphQL
```

2. install dependencies:
```bash
yarn
```

3. create environment file
```bash
cp .env.example .env
```
> add your mongo db link in _**.env**_ file.

## Usage
To run the graphQL API server, execute the following command:
```bash
yarn dev
```

Once the server is running, access the GraphQL Playground or use your preferred GraphQL client to interact with the API.

## Configuration
The API does not require specific configuration for basic usage. However, additional configuration options may be available for advanced usage or integration with external services.

## Examples
To check serve is running or not try http://localhost:8080/graphql

### 1.Example Queries
use GraphQL queries:
```bash
query helloQuery 
    {
        hello
    }
```

## License

This README file provides basic instructions, examples of GraphQL queries/mutations,


