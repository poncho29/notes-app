export interface User {
  id: string
  name: string
  email: string
}

export interface CreateUser extends Omit<User, "id"> {
  password: string
}

export interface LoginResponse {
  token: string
  user: User
}