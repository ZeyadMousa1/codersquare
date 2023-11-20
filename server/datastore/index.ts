import { CommentDao } from "./dao/CommentDao";
import { LikeDao } from "./dao/LikeDao";
import { PostDao } from "./dao/PostDao";
import { UserDao } from "./dao/UserDao";
import { SqlDataStore } from "./sql";

export interface DataStore extends UserDao, PostDao, LikeDao, CommentDao { }

export let db: DataStore;

export async function initDB() {
    db = await new SqlDataStore().openDb();
}

