import User from "../model/user.js"; // Import the User model
import mongoose from "mongoose";

const userRepository = {
    createUser: async (userData) => {
        return await User.create(userData); // Create a new user
    },
    findUserByEmail: async (email) => {
        return await User.findOne({ email }); // Find user by email
    },
    findUserByLogin: async (login) => {
        return await User.findOne({ login });
    },
    updateCategoryName: async (userId, categoryId, newCategoryName) => {
        const userObjectId = new mongoose.Types.ObjectId(userId);
        const categoryObjectId = new mongoose.Types.ObjectId(categoryId);
        const user = await User.findOneAndUpdate(
            { _id: userObjectId, "category._id": categoryObjectId },
            { $set: { "category.$.name": newCategoryName } },
            { new: true } // Return the updated document
        );
    
        if (!user) {
            throw new Error("User or category not found");
        }
        return user;
    },

    updateCategoryRepos: async (userId, categoryId, action, repos) => {
        const userObjectId = new mongoose.Types.ObjectId(userId);
        const categoryObjectId = new mongoose.Types.ObjectId(categoryId);
        if(repos._id){
            repos = new mongoose.Types.ObjectId(repos._id);
        }
    
        let updateQuery;
        switch (action) {
            case 'add': // Add a new repo to the category
            updateQuery = { $push: { "category.$.repos": { $each: repos } } };
                break;

            case 'remove': // Remove the repo from the category
                updateQuery = { $pull: { "category.$.repos": { _id: repos } } };
                break;
                
            default:
                throw new Error("Invalid action specified");
        }
        
        const options = { new: true };

        const user = await User.findOneAndUpdate(
            { _id: userObjectId, "category._id": categoryObjectId },
            updateQuery,
            options
        );
        console.log(user);
    
        if (!user) {
            throw new Error("User or category not found");
        }
        return user;
    },

    addCategory: async (userId, category) => {
        const userObjectId = new mongoose.Types.ObjectId(userId);

        const categoryObj = {
            name: category,
            repos: [] // Initialize with an empty array of repos
        };
    
        const user = await User.findOneAndUpdate(
            { _id: userObjectId },
            { $push: { category: categoryObj } }, // Add new category
            { new: true }
        );
    
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    },

    deleteCategory: async (userId, categoryId) => {
        const userObjectId = new mongoose.Types.ObjectId(userId);
        const categoryObjectId = new mongoose.Types.ObjectId(categoryId);
    
        const user = await User.findOneAndUpdate(
            { _id: userObjectId },
            { $pull: { category: { _id: categoryObjectId } } }, // Remove category
            { new: true }
        );
    
        if (!user) {
            throw new Error("User or category not found");
        }
        return user;
    },

    getCategories: async (userId) => {
        const userObjectId = new mongoose.Types.ObjectId(userId);
    
        const user = await User.findById(userObjectId, "category");
        
        if (!user) {
            throw new Error("User not found");
        }
    
        return user.category;
    }
};

export default userRepository; // Export the user repository
