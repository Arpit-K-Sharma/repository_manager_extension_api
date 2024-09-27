# GitHub Repository Management API

This is a backend API developed using **Express** and **Deno** to support a Chrome extension that helps users manage their GitHub repositories. The API provides endpoints for listing, creating, updating, and deleting repositories.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features

- List all repositories for a user
- Create new repositories
- Update existing repositories
- Delete repositories
- Authentication with GitHub API

## Technologies

- **Node.js** with **Express** or **Deno** (depending on your preference)
- **MongoDB** for data storage (or other database solutions)
- **GitHub API** for interacting with user repositories
- **JWT** for authentication

## Installation

### Using Node.js with Express

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/repo-name.git
   cd repo-name

2. Install dependencies:

    ```bash
    npm install

3. Create a .env file in the root directory and add your environment variables.

4. Run the server:

    ```bash
    npm start

## Usage
- After starting the server, you can access the API at http://localhost:3000.

- Make sure to set up your Chrome extension to communicate with this API.



