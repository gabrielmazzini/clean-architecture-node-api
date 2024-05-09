import {User} from "../entities/User";

export interface IUserRepository {
    fyndByEmail(email: string): Promise<User | null>;
    save(user: User): Promise<void>;
}
