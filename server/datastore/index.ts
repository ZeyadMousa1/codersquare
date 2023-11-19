import { CommentDao } from "./CommentDao";
import { LikeDao } from "./LikeDao";
import { PostDao } from "./PostDao";
import { UserDao } from "./UserDao";
import { InMemoryDataStore } from "./memorydb";

export interface DataStore extends UserDao, PostDao, LikeDao, CommentDao { }

export const db = new InMemoryDataStore();