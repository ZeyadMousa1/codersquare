import { Comment, Post, User } from './Types';

// Post Apis
export type CreatePostRequest = Pick<Post, 'title' | 'url'>;
export interface CreatePostResponse {}

export interface ListPostsRequest {}
export interface ListPostResponse {
   posts: Post[];
}

export interface GetPostRequest {}
export interface GetPostResponse {
   post: Post;
}

// Comment Apis
export type CreateCommentRequest = Pick<Comment, 'comment'>;
export interface CreateCommentResponse {
   status: string;
}
export interface CreateCommentRequestParams {
   id: string;
}

export interface GetAllPostCommentsRequest {}
export type GetAllPostCommentsResponse = {
   count: number;
   comments: Comment[];
};
export interface GetAllPostCommentsRequestParams {
   id: string;
}

export interface DeleteCommentRequestParams {
   id: string;
}
export interface DeleteCommentResponse {
   status: string;
}

// Like Apis

// User APis
export type SignUpRequest = Pick<
   User,
   'email' | 'firstName' | 'lastName' | 'userName' | 'password'
>;
export interface SignUpResponse {
   jwtToken: string;
}

export interface SignInRequest {
   login: string; // username or email
   password: string;
}
export type SigInResponse = {
   user: Pick<User, 'email' | 'firstName' | 'lastName' | 'userName' | 'id'>;
   jwtToken: string;
};

export interface getAllUsersRequest {}
export interface getAllUsersResponse {
   users: User[];
}
