import path from 'path';
import { Database, open } from 'sqlite';
import sqlite3 from 'sqlite3';

import { DataStore } from '..';
import { Comment, Like, Post, User } from '../../Types';

export class SqlDataStore implements DataStore {
   private db!: Database<sqlite3.Database, sqlite3.Statement>;

   public async openDb() {
      this.db = await open({
         filename: path.join(__dirname, 'codersquare.sqlite'),
         driver: sqlite3.Database,
      });

      this.db.run('PRAGMA foreign_keys = ON; ');

      await this.db.migrate({
         migrationsPath: path.join(__dirname, 'migrations'),
      });

      return this;
   }

   async createUser(user: User): Promise<void> {
      await this.db.run(
         'INSERT INTO users (id, firstName, lastName, userName, email, password) VALUES (?,?,?,?,?,?)',
         user.id,
         user.firstName,
         user.lastName,
         user.userName,
         user.email,
         user.password
      );
   }
   getAllUsers(): Promise<User[]> {
      return this.db.all<User[]>('SELECT * FROM users');
   }
   getUserById(id: string): Promise<User | undefined> {
      return this.db.get<User>(`SELECT * FROM users WHERE id = ?`, id);
   }

   getUserByEmail(email: string): Promise<User | undefined> {
      return this.db.get<User>(`SELECT * FROM users WHERE email = ? `, email);
   }
   getUserByUserName(userName: string): Promise<User | undefined> {
      return this.db.get<User>(`SELECT * FROM users WHERE userName = ?`, userName);
   }
   listPosts(): Promise<Post[]> {
      return this.db.all<Post[]>('SELECT * FROM posts');
   }
   async createPost(post: Post): Promise<void> {
      await this.db.run(
         'INSERT INTO posts (id, title, url, userId, postAt) VALUES (?,?,?,?,?)',
         post.id,
         post.title,
         post.url,
         post.userId,
         post.postedAt
      );
   }
   getPost(id: string): Promise<Post | undefined> {
      return this.db.get<Post>(`SELECT * FROM post WHERE id = ?`, id);
   }
   deletePost(id: string): Promise<void> {
      throw new Error('Method not implemented.');
   }
   createLike(like: Like): Promise<void> {
      throw new Error('Method not implemented.');
   }
   async createComment(comment: Comment): Promise<void> {
      await this.db.run(
         'INSERT INTO comments (id, userId, postId, comment, postedAt) VALUES(?,?,?,?,?)',
         comment.id,
         comment.userId,
         comment.postId,
         comment.comment,
         comment.postedAt
      );
   }
   listComments(postId: string): Promise<Comment[]> {
      return this.db.all<Comment[]>(`SELECT * FROM comments WHERE postId = ? `, postId);
   }
   async deleteComent(id: string): Promise<void> {
      await this.db.run(`DELETE FROM comments WHERE id = ?`, id);
   }

   getComment(id: string): Promise<Comment | undefined> {
      return this.db.get<Comment>(`SELECT * FROM comments WHERE id = ? `, id);
   }
}
