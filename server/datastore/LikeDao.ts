import { Like } from "../Types";

export interface LikeDao {
    createLike(like: Like): void;
}