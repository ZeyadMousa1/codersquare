import { Post } from './Types';

// Post Apis
export type CreatePostRequest = Pick<Post, 'title' | 'url' | 'userId'>
export interface CreatePostResponse { }

export interface ListPostsRequest { }
export interface ListPostResponse {
    posts: Post[]
}

export interface GetPostRequest { }
export interface GetPostResponse {
    post: Post
}

// Comment Apis

// Like Apis

// User APis
