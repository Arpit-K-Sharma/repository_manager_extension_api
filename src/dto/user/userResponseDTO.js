class UserResponseDTO {
    constructor(user) {
        this.id = user._id;
        this.name = user.name;
        this.email = user.email;
        this.login = user.login;
        this.category = user.category; // Added category field
    }

    static fromUser(user) {
        return new UserResponseDTO(user);
    }

    static fromUsers(users) {
        return users.map(user => new UserResponseDTO(user)); // Fixed typo in map method
    }
}

export default UserResponseDTO;
