import { Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';

import { RoleResp } from '../../global/resp/role.resp';

@Service()
@Resolver()
export class RoleResolver {
  @Query(() => RoleResp)
  async events() {}
}
