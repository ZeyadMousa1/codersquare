import { User } from '../../Types';

export interface UserDao {
    createUser(user: User): Promise<void>;

    getUserByEmail(email: string): Promise<User | undefined>;

    getUserByUserName(userName: string): Promise<User | undefined>;
}
