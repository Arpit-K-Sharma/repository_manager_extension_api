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

    
};

export default userService; // Export the user service
