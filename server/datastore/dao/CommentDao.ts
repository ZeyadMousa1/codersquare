import '../../Types';
import { Comment } from '../../utils/Types';

export interface CommentDao {
   createComment(comment: Comment): Promise<void>;

   listComments(postId: string): Promise<Comment[]>;

   deleteComent(id: string): Promise<void>;

   getComment(id: string): Promise<Comment | undefined>;
}
