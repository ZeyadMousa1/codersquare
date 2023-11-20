import { Post } from '../Types';

export interface PostDao {
    listPosts(): Post[];

    createPost(post: Post): void;

    getPost(id: string): Post | undefined;

    deletePost(id: string): void;
}