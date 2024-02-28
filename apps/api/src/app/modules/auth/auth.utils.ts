import { Request as RequestType } from 'express';


function extractJWT(req: RequestType): string | null {
    const tokenKey = process.env.JWT_ACCESS_TOKEN_KEY;

    if (
      req.cookies &&
      tokenKey in req.cookies &&
      req.cookies[tokenKey].length > 0
    ) {
      return req.cookies[tokenKey];
    }
    return null;
}

export const AUTH_UTILS = {
    extractJWT
}