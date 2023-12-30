import { Request, Response } from 'express';

import { User } from '../../modules/user';

export interface IContext {
  req: Request;
  res: Response;
  user?: User;
}
