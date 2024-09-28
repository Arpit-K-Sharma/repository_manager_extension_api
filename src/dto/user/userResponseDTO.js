class UserResponseDTO{

    constructor(user){
        this.id = user._id;
        this.name = user.name;
        this.email = user.email;
    }

    static fromUser(user){
        return new UserResponseDTO(user);
    }

    static fromUsers(users){
        return UserResponseDTO.mao(user => new UserResponseDTO(user));
    }
}


export default UserResponseDTO;