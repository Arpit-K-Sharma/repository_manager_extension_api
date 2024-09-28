import User from "../model/user.js"; // Import the User model

const userRepository = {
    createUser: async (userData) => {
        return await User.create(userData); // Create a new user
    },
    findUserByEmail: async (email) => {
        return await User.findOne({ email }); // Find user by email
    },
};

export default userRepository; // Export the user repository
