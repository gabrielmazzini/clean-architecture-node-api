/* eslint-disable max-len */
import {User} from "../entity/user-entity";

export interface IUserGateway {
    fyndByEmail(email: string): Promise<object | null>;
    save(user: User): Promise<void>;
    // getInfoUser(id: string): Promise<User | null>;
    // updateUser(id: string, name: string, email: string, password: string): Promise<void>;
    // deleteUser(id: string): Promise<void>;
}
