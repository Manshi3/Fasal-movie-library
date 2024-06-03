### Fasal Movie Library

## Setup to run for local machine:

# Prerequisites
1. Node.js and npm installed.
2. MySQL installed and running.

# Set up the MySQL Database
```
CREATE DATABASE movie_library;
```
**_NOTE:_** You can keep different database name but put the same name in the .env file.

# Create .env file in the project folder 
Add the following content:
```
OMDB_API_KEY=your-omdb-api-key
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASS=your-database-password
DB_NAME=your-database-name
```

**_NOTE:_** Please keep the database name test

# Install necessary dependencies:
```
npm install express ejs express-ejs-layouts body-parser dotenv axios bcryptjs express-session mysql2 sequelize connect-flash

```

# Run the Application
1. Start the MySQL server if it's not running.
2. Run the Node.js server:
```
node server.js
```
3. Open your browser and navigate to http://localhost:3000.
