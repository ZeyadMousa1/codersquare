import { Post, User } from './Types';

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
export type SignUpRequest = Pick<User, 'email' | 'firstName' | 'lastName' | 'userName' | 'password'>
export interface SignUpResponse { }

export interface SignInRequest {
    login: string, // username or email
    password: string
}
export type SigInResponse = Pick<User, 'email' | 'firstName' | 'lastName' | 'userName' | 'id'>

export interface getAllUsersRequest { };
export interface getAllUsersResponse {
    users: User[]
}