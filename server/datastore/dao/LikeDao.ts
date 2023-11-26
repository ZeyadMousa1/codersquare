import { Like, User } from '../../Types';

export interface LikeDao {
   createLike(like: Like): Promise<void>;

   deleteLike(like: Like): Promise<void>;

   countLikes(postId: string): Promise<number>;

   listPostLikes(postId: string): Promise<User[]>;

   exists(like: Like): Promise<boolean>;
}
