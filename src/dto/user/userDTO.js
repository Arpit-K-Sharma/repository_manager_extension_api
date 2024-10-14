class UserDTO {
    constructor({ name, email, login, category }) {
        this.name = name;
        this.email = email;
        this.login = login; // Added login field
        this.category = category; // Added category field
    }

    static validate(userData) {
        const { name, email, login} = userData;

        if (!name || !email || !login) {
            throw new Error("All fields are required");
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error("Invalid email format");
        }

        return new UserDTO(userData); // Return structured user data if validation passes
    }
}

export default UserDTO;
