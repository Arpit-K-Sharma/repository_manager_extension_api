// /config/cors.js
import cors from 'cors';

const corsOptions = {
    origin: [
        'https://github.com',
        'http://localhost:5000',
        "chrome-extension://your-extension-id"
        // add other allowed origins here
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Enable credentials if needed
};

export default cors(corsOptions);
