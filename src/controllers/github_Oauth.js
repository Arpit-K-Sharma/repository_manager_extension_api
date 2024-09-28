import express from "express";
import axios from 'axios';
import { successResponse, errorResponse } from "../utils/responseHandler.js";
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, REDIRECT_URI } from '../config/config.js';

const github_oauth_route = express.Router();



// github_oauth_route.get('/github', (req, res) => {
//     const authenticateUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=repo`;
//     res.redirect(authenticateUrl); 
// });

// Step 2: Handle the OAuth callback
github_oauth_route.get('/github/callback', async (req, res) => {
    const { code } = req.body;

    if (!code) {
        return errorResponse(res, 400, 'No authorization code provided');
    }

    try {
        // Step 3: Exchange the authorization code for an access token
        const tokenResponse = await axios.post('https://github.com/login/oauth/access_token', {
            client_id: GITHUB_CLIENT_ID,
            client_secret: GITHUB_CLIENT_SECRET,
            code: code,
            redirect_uri: REDIRECT_URI
        }, {
            headers: { accept: 'application/json' }
        });

        const { access_token } = tokenResponse.data;

        if (access_token) {
            return successResponse(res, 200, 'Access token retrieved successfully', { access_token: access_token });
        } else {
            return errorResponse(res, 400, "Unable to retrieve access token");
        }
    } catch (error) {
        console.error(error);
        return errorResponse(res, 500, 'Failed to authenticate with GitHub', error);
    }
});

export default github_oauth_route;