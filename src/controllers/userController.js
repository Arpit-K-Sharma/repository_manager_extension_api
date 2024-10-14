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

user_route.post("/getUserByLogin", async (req, res) => {
    try{
        const getUserByLogin = await userService.getUserByLogin(req.body);
        successResponse(res, 201, "User retrieval successful", getUserByLogin);
    }
    catch(error)
{
    errorResponse(res, 400, "User retrieval failed", error);
}});

user_route.post("/addCategory", async (req, res) => {
    try {
        const { userId, category } = req.body;
        const updatedUser = await userService.addCategory(userId, category);
        successResponse(res, 201, "Category added successfully", updatedUser);
    } catch (error) {
        errorResponse(res, 400, "Category addition failed", error.message);
    }
});

user_route.get("/getCategories", async (req, res) => {
    try {
        const { userId } = req.query;
        const categories = await userService.getCategories(userId);
        successResponse(res, 200, "Categories retrieved successfully", categories);
    } catch (error) {
        errorResponse(res, 400, "Failed to retrieve categories", error.message);
    }
});


user_route.delete("/deleteCategory", async (req, res) => {
    try {
        const { userId, categoryId } = req.query;
        const updatedUser = await userService.deleteCategory(userId, categoryId);
        successResponse(res, 200, "Category deleted successfully", updatedUser);
    } catch (error) {
        errorResponse(res, 400, "Category deletion failed", error.message);
    }
});


user_route.patch("/updateCategoryName", async (req, res) => {
    try {
        const { userId, categoryId, newCategoryName } = req.body; // Extract required data from request

        const updatedUser = await userService.updateCategoryName(userId, categoryId, newCategoryName);

        successResponse(res, 200, "Category updated successfully", updatedUser);
    } catch (error) {
        errorResponse(res, 400, "Category update failed", error.message);
    }
});

user_route.patch("/updateCategoryRepos", async (req, res) => {
    try {
        const { userId, categoryId, action, repos } = req.body;

        const updatedUser = await userService.updateCategoryRepos(userId, categoryId, action, repos);

        successResponse(res, 200, "Category repos updated successfully", updatedUser);
    } catch (error) {
        errorResponse(res, 400, "Category repos update failed", error.message);
    }
});



export default user_route;
