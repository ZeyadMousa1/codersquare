import { User } from '../../utils/Types';

export interface UserDao {
   createUser(user: User): Promise<void>;

   getUserByEmail(email: string): Promise<User | undefined>;

   getUserByUserName(userName: string): Promise<User | undefined>;

   getUserById(id: string): Promise<User | undefined>;

   getAllUsers(): Promise<User[]>;

   searchByUserName(userName: string): Promise<User[] | undefined>;

   updateCurrentUser(user: User): Promise<void>;

   deleteUser(userId: string): Promise<void>;
}
