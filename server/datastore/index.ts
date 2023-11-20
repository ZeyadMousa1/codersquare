import { CommentDao } from "./dao/CommentDao";
import { LikeDao } from "./dao/LikeDao";
import { PostDao } from "./dao/PostDao";
import { UserDao } from "./dao/UserDao";
import { InMemoryDataStore } from "./memorydb";

export interface DataStore extends UserDao, PostDao, LikeDao, CommentDao { }

export const db = new InMemoryDataStore();