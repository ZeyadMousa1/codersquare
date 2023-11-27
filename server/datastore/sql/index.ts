import path from 'path';
import { Database, open } from 'sqlite';
import sqlite3 from 'sqlite3';

import { DataStore } from '..';
import { Comment, Like, Post, User } from '../../utils/Types';

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

   // users
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

   //posts
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
      return this.db.get<Post>(`SELECT * FROM posts WHERE id = ?`, id);
   }
   deletePost(id: string): Promise<void> {
      throw new Error('Method not implemented.');
   }

   // search
   searchByUserName(userName: string): Promise<User[] | undefined> {
      return this.db.all(`SELECT * FROM users WHERE userName LIKE ? || '%'`, userName);
   }

   //likes
   async createLike(like: Like): Promise<void> {
      await this.db.run(
         'INSERT INTO likes (userId, postId) VALUES (?,?)',
         like.userId,
         like.postId
      );
   }

   async deleteLike(like: Like): Promise<void> {
      await this.db.run(
         `DELETE FROM likes WHERE userId = ? AND postId = ?`,
         like.userId,
         like.postId
      );
   }

   async countLikes(postId: string): Promise<number> {
      let result = await this.db.get<{ count: number }>(
         `SELECT COUNT(*) AS count FROM likes WHERE postId = ? `,
         postId
      );
      return result?.count ?? 0;
   }

   listPostLikes(postId: string): Promise<User[]> {
      return this.db.all(
         `SELECT u.id, u.userName, u.email FROM users AS u 
      INNER JOIN likes AS l
      ON u.id = l.userId
      WHERE l.postId = ? `,
         postId
      );
   }
   async exists(like: Like): Promise<boolean> {
      let awaitResult = await this.db.get<number>(
         'SELECT 1 FROM likes WHERE postId = ? and userId = ?',
         like.postId,
         like.userId
      );
      let val: boolean = awaitResult === undefined ? false : true;
      return val;
   }

   // comments
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
