import mongoose from "mongoose";

const repoSchema = new mongoose.Schema({
    repoName: {
        type: String,
        required: false,
    },
    link: {
        type: String,
        required: false,
    }
})
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    repos: {
        type: [repoSchema],
        required: false,
    },
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    login: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: [categorySchema], 
        required: false,
    }
},{collection: 'users'});

export default mongoose.model("User", userSchema);
