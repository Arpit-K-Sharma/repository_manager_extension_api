import userRepository from "../repositories/userRepository.js"; // Import the user repository
import UserDTO from "../dto/user/userDTO.js";
import UserResponseDTO from "../dto/user/userResponseDTO.js";

const userService = {
    registerUser: async (userData) => {
        // Validate and transform incoming data
        const userDTO = UserDTO.validate(userData);

        // Check if user exists
        const existingUser = await userRepository.findUserByEmail(userDTO.email);
        if (existingUser) {
            throw new Error("User already exists");
        }

        // Create new user
        const newUser = await userRepository.createUser(userDTO);

        // Return structured response using DTO
        return UserResponseDTO.fromUser(newUser);
    },

    getUserByLogin: async (userData) => {
        const foundData = await userRepository.findUserByLogin(userData.login);

        if (!foundData) {
            return {}; // Return an empty object if no user is found
        }

        return UserResponseDTO.fromUser(foundData);
    },

    getCategories: async (userId) => {
        if (!userId) {
            throw new Error("User ID is required");
        }

        return await userRepository.getCategories(userId);
    },


    updateCategoryName: async (userId, categoryId, newCategoryName) => {
        if (!userId || !categoryId || !newCategoryName) {
            throw new Error("All fields are required");
        }
        const response = await userRepository.updateCategoryName(userId, categoryId, newCategoryName);

        return UserResponseDTO.fromUser(response);
    },

    updateCategoryRepos: async (userId, categoryId, action, repos) => {
        if (!userId || !categoryId || !action || !repos) {
            throw new Error("All fields are required");
        }

        const response = await userRepository.updateCategoryRepos(userId, categoryId, action, repos);

        return UserResponseDTO.fromUser(response);
    },

    addCategory: async (userId, category) => {
        if (!userId || !category) {
            throw new Error("User ID and category are required");
        }

        const response = await userRepository.addCategory(userId, category);

        return UserResponseDTO.fromUser(response);
    },

    deleteCategory: async (userId, categoryId) => {
        if (!userId || !categoryId) {
            throw new Error("User ID and category ID are required");
        }

        const response = await userRepository.deleteCategory(userId, categoryId);

        return UserResponseDTO.fromUser(response);
    }



};

export default userService; // Export the user service
