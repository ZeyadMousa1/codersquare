import { User, Post, Like, Comment } from '../../types';
import { DataStore } from '../index';
export class InMemoryDataStore implements DataStore {
    private users: User[] = [];
    private posts: Post[] = [];
    private like: Like[] = [];
    private comments: Comment[] = [];

    createUser(user: User): void {
        this.users.push(user);
    }

    getUserByEmail(email: string): User | undefined {
        return this.users.find(u => u.email === email);
    }

    getUserByUserName(userName: string): User | undefined {
        return this.users.find(u => userName === u.userName);
    }

    listPosts(): Post[] {
        return this.posts;
    }

    createPost(post: Post): void {
        this.posts.push(post)
    }

    getPost(id: string): Post | undefined {
        return this.posts.find(p => p.id === id);
    }

    deletePost(id: string): void {
        const index = this.posts.findIndex(p => p.id === id);
        if (index == -1) return;
        this.posts.splice(index, 1);
    }

    createLike(like: Like): void {
        this.like.push(like)
    }

    createComment(comment: Comment): void {
        this.comments.push(comment);
    }

    listComments(postId: string): Comment[] {
        return this.comments.filter(c => c.postId === postId)
    }

    deleteComent(id: string): void {
        const index = this.posts.findIndex(c => c.id === id);
        if (index == -1) return;
        this.posts.splice(index, 1);
    }

}