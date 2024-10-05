import express from "express";
import axios from 'axios';
import { successResponse, errorResponse } from "../utils/responseHandler.js";
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, REDIRECT_URI } from '../config/config.js';

const github_oauth_route = express.Router();



// github_oauth_route.get('/github', (req, res) => {
//     const authenticateUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=repo`;
//     res.redirect(authenticateUrl); 
// });

github_oauth_route.post('/github/callback', async (req, res) => {
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
        console.log(access_token);

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

github_oauth_route.get('/getUserData', async (req, res) => {
    const authorization = req.get("Authorization");

    if (!authorization) {
        return errorResponse(res, 400, 'No Authorization provided');
    }

    try {
        const userResponse = await axios.get("https://api.github.com/user", {
            headers: {
                'Authorization': authorization
            }
        });

        if(userResponse){
            console.log('User data retrieved:', userResponse.data);
            return successResponse(res, 200, 'User data retrieved successfully', userResponse.data)
        }
    }
    catch (error) {
        console.error('Error retrieving user data from GitHub:', error);
    
        // Check if error response exists and return relevant error message
        if (error.response) {
            return errorResponse(res, error.response.status, 'Failed to retrieve user data', error.response.data);
        }
    
        return errorResponse(res, 500, 'Failed to authenticate with GitHub', error.message);
    }

});

github_oauth_route.get('/getUserRepos', async (req, res) => {
    const authorization = req.get("Authorization");

    if (!authorization) {
        return errorResponse(res, 401, 'No Authorization header provided');
    }

    try {
        const reposResponse = await axios.get("https://api.github.com/user/repos", {
            headers: {
                'Authorization': authorization
            },
            params: {
                sort: 'updated',
                per_page: 100  // Adjust this value based on how many repos you want to fetch
            }
        });

        // Format the response as a dictionary of repo names and links
        const formattedRepos = reposResponse.data.reduce((acc, repo) => {
            acc[repo.name] = repo.html_url;
            return acc;
        }, {});

        console.log('User repositories retrieved:', Object.keys(formattedRepos).length);
        return successResponse(res, 200, 'User repositories retrieved successfully', formattedRepos);
    }
    catch (error) {
        console.error('Error retrieving user repositories from GitHub:', error);
    
        if (error.response) {
            // GitHub API error
            return errorResponse(
                res, 
                error.response.status, 
                'Failed to retrieve user repositories', 
                error.response.data
            );
        } else if (error.request) {
            // Network error
            return errorResponse(res, 503, 'Unable to reach GitHub API', 'Network error');
        } else {
            // Unexpected error
            return errorResponse(res, 500, 'An unexpected error occurred', error.message);
        }
    }
});

export default github_oauth_route;