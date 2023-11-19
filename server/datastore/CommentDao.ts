import '../types'
import { Comment } from '../types';
export interface CommentDao {
    createComment(comment: Comment): void;

    listComments(postId: string): Comment[];

    deleteComent(id: string): void;
}