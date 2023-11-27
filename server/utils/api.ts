import { Comment, Post, User } from '../utils/Types';

// Post Apis
export type CreatePostRequest = Pick<Post, 'title' | 'url'>;
export interface CreatePostResponse {}

export interface ListPostsRequest {}
export interface ListPostResponse {
   posts: Post[];
}

export interface GetPostRequestParams {
   id: string;
}
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

export interface LikeRequestParams {
   postId: string;
}
export interface CountLikesRequest {}
export interface CountLikesRequestParams {
   postId: string;
}
export interface CountLikesResponse {
   count: number;
}

export interface ListPostLikesRequest {}
export interface ListPostLikesRequestarams {
   postId: string;
}
export interface listPostLikesResponse {
   likes: User[];
}

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

export interface SearchByUserNameRequestQuery {
   userName: string;
}
export interface SearchByUserNameResponse {
   users: User[];
}
