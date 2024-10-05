import express from "express";
import morgan from 'morgan';
import './src/config/db_connection.js'; // Import the database connection
import user_route from './src/controllers/userController.js'; // Import user routes
import github_oauth_route from "./src/controllers/github_Oauth.js";
import cors from "./src/config/cors.js";
import { PORT } from './src/config/config.js'; // Import the server port from the config

const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies
app.use("/api/users", user_route); 
app.use("/auth", github_oauth_route);
app.use(cors);
app.use(morgan('combined'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); // Log the server status
});
