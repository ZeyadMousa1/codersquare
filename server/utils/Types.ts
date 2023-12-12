import { RequestHandler } from 'express';

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    avatar: string;
    role: string;
}

export interface Post {
    id: string;
    title: string;
    url: string;
    userId: string;
    postedAt: number;
    image?: string;
}

export interface Like {
    userId: string;
    postId: string;
}

export interface Comment {
    id: string;
    userId: string;
    postId: string;
    comment: string;
    postedAt: number;
}

export interface PayLoadObject {
    userId: string;
}

export type WithError<T> = T & { error: string };

// RequestHandler <Params, ResBody, ReqBody, ReqQuery>
export type ExpressHandler<Params, Req, Res, Query> = RequestHandler<
    Partial<Params>, // or string if you dont have params in handlers and delete params from genric
    Partial<WithError<Res>>,
    Partial<Req>,
    Partial<Query>
>;

// export type ExpressHandlerWithParams<Params, Req, Res> = RequestHandler<
//   Partial<Params>,
//   Partial<WithError<Res>>,
//   Partial<Req>,
//   any
// >;
