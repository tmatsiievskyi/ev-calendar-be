import { AuthChecker } from 'type-graphql';

import { RoleResolver } from '../../modules/role';
import { UserResolver } from '../../modules/user';
import { IContext } from '../_interfaces';

export const resolvers = [RoleResolver, UserResolver] as const;

export const authChecker: AuthChecker<IContext> = (
  { context: { user } },
  roles
) => {
  if (!user) {
    return false;
  }

  if (roles.length === 0) {
    return true;
  }

  return user.role.some((r) => roles.includes(r.name));
};
