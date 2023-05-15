# Back-End App

This is a back-end application built with NodeJS, Typescript, Cors, dotenv, ExpressJS, knex, MySQL, ts-node.

## Features

- (GET) findItem: Finds a product in the product database.
- (PUT) updateItem: Updates product price.

## Installation

1. Clone the repository: `git clone https://github.com/giojulio/price-update-tool.git`
2. Navigate to the project directory: `cd price-update-tool`
3. Install the dependencies: `npm install`

## Configuration

1. Set up the required environment variables:
   - `DB_HOST`: MySQL host credentials.
   - `DB_USER`: MySQL user credentials.
   - `DB_PASSWORD`: MySQL password credentials.
   - `DB_DATABASE`: MySQL database credentials.

## Database Setup

1. Run `npm run migrations` from the backend portion root directory.

## Usage

1. Start the server: `npm run start`
1.a. For develoer server, use: `npm run dev`
2. The server will be running at `http://localhost:3306`

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please submit a pull request or open an issue.
