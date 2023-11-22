import { User, Post, Like, Comment } from '../../Types';
import { DataStore } from '../index';
export class InMemoryDataStore implements DataStore {
    private users: User[] = [];
    private posts: Post[] = [];
    private like: Like[] = [];
    private comments: Comment[] = [];

    createUser(user: User): Promise<void> {
        this.users.push(user);
        return Promise.resolve()
    }

    getAllUsers(): Promise<User[]> {
        throw new Error('Method not implemented.');
    }
    getUserById(Id: string): Promise<User | undefined> {
        throw new Error('Method not implemented.');
    }
    getUserByEmail(email: string): Promise<User | undefined> {
        return Promise.resolve(this.users.find(u => u.email === email));
    }

    getUserByUserName(userName: string): Promise<User | undefined> {
        return Promise.resolve(this.users.find(u => userName === u.userName));
    }

    listPosts(): Promise<Post[]> {
        return Promise.resolve(this.posts);
    }

    createPost(post: Post): Promise<void> {
        this.posts.push(post)
        return Promise.resolve()
    }

    getPost(id: string): Promise<Post | undefined> {
        return Promise.resolve(this.posts.find(p => p.id === id));
    }

    deletePost(id: string): Promise<void> {
        const index = this.posts.findIndex(p => p.id === id);
        if (index == -1) return Promise.resolve();
        this.posts.splice(index, 1);
        return Promise.resolve()
    }

    createLike(like: Like): Promise<void> {
        this.like.push(like)
        return Promise.resolve()
    }

    createComment(comment: Comment): Promise<void> {
        this.comments.push(comment);
        return Promise.resolve()
    }

    listComments(postId: string): Promise<Comment[]> {
        return Promise.resolve(this.comments.filter(c => c.postId === postId))
    }

    deleteComent(id: string): Promise<void> {
        const index = this.posts.findIndex(c => c.id === id);
        if (index == -1) return Promise.resolve();
        this.posts.splice(index, 1);
        return Promise.resolve()
    }

}