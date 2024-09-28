import express from "express";
import userService from "../services/userService.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

const user_route = express.Router();

user_route.post("/register", async (req, res) => {
    try {
        const newUser = await userService.registerUser(req.body); // Call service to register user
        successResponse(res, 201, "User registered successfully", newUser); // Send response using DTO
    } catch (error) {
        errorResponse(res, 400, "User registration failed", error);
    }
});

// user_route.get("/getUser", async (req, res) => {
//     try{
//         const getAllUsers = await userService.getAllUsers();
//         successResponse(res, 201, "User retrieval successful", getAllUsers);
//     }
//     catch(error)
// {
//     errorResponse(res, 400, "User retrieval failed", error);
// }})

export default user_route;
