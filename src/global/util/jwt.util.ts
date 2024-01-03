import jwt, { SignOptions } from 'jsonwebtoken';

import { ACCESS_TOKEN_PRIVATE_KEY, APP_SECRET } from '../config/env';

type Payload = Record<string, any>;

export const createJwt = (payload: Payload, options: SignOptions = {}) => {
  try {
    return jwt.sign(payload, APP_SECRET, {
      issuer: 'ev-calendar-be',
      audience: ['ev-calendar-fe'],
      expiresIn: '4w',
      ...options,
    });
  } catch (err) {
    return null;
  }
};

export const verifyJwt = <T>(token: string, key: string): T | null => {
  try {
    const resp = jwt.verify(token, key) as T;
    return resp;
  } catch (error) {
    console.log(error);
    return null;
  }
};
