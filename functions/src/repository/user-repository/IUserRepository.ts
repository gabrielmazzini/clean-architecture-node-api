/* eslint-disable max-len */
import {User} from "../../entities/user-entities/User";

export interface IUserRepository {
    fyndByEmail(email: string): Promise<User | null>;
    save(user: User): Promise<void>;
}

export interface IgetUserRepository {
    getInfoUser(id: string): Promise<User | null>;
}

export interface IUpdateUserRepository {
    updateUser(id: string, name: string, email: string, password: string): Promise<void>;
}

export interface IDeleteUserRepository {
    deleteUser(id: string): Promise<void>;
}
