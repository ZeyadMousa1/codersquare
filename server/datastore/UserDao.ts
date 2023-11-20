import { User } from '../Types';

export interface UserDao {
    createUser(user: User): void;

    getUserByEmail(email: string): User | undefined;

    getUserByUserName(userName: string): User | undefined;
}
