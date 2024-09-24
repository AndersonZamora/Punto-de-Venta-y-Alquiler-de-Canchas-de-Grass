
export interface IUser {
    id: string
    name: string
    username: string
    password: string
    status: boolean
    role: Role
}

export type Role = 'admin' | 'user';