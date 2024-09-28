class UserDTO {
    constructor({ name, email, password }) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static validate(userData) {
        const { name, email, password } = userData;

        if (!name || !email || !password) {
            throw new Error("All fields are required");
        }

        if (password.length < 6) {
            throw new Error("Password must be at least 6 characters long");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error("Invalid email format");
        }

        return new UserDTO(userData); // Return structured user data if validation passes
    }
}

export default UserDTO;
