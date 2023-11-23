import { Post, User } from './Types';

// Post Apis
export type CreatePostRequest = Pick<Post, 'title' | 'url'>
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
export interface SignUpResponse {
    jwtToken: string
}

export interface SignInRequest {
    login: string, // username or email
    password: string
}
export type SigInResponse = {
    user: Pick<User, 'email' | 'firstName' | 'lastName' | 'userName' | 'id'>,
    jwtToken: string
}

export interface getAllUsersRequest { };
export interface getAllUsersResponse {
    users: User[]
}