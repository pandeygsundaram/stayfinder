import type { Request } from 'express-serve-static-core';

export type TypedRequest<TParams = {}, TBody = {}, TQuery = {}> = Request<TParams, any, TBody, TQuery>;

// Authenticated version of TypedRequest that includes `userId`
export type TypedAuthRequest<
    TParams = {},
    TBody = {},
    TQuery = {}
> = TypedRequest<TParams, TBody, TQuery> & {
    userId?: number;
};