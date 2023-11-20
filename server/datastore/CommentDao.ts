import '../Types'
import { Comment } from '../Types';
export interface CommentDao {
    createComment(comment: Comment): void;

    listComments(postId: string): Comment[];

    deleteComent(id: string): void;
}