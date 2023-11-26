import { Like } from '../../Types';

export interface LikeDao {
   createLike(like: Like): Promise<void>;

   deleteLike(like: Like): Promise<void>;

   getPostLikes(postId: string): Promise<number>;

   exists(like: Like): Promise<boolean>;
}
