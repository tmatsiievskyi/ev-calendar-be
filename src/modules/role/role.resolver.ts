import { Arg, Args, Mutation, Query, Resolver } from 'type-graphql';
import { Inject, Service } from 'typedi';

import { Role } from './role.entity';
import { CreateRoleInput, RolesWhereInput } from './role.input';
import { RoleResp } from './role.resp';
import { RoleService } from './role.service';

@Service()
@Resolver()
export class RoleResolver {
  @Inject(() => RoleService)
  roleService: RoleService;

  @Mutation(() => Role)
  async createRole(@Arg('input') input: CreateRoleInput) {
    return await this.roleService.createRole(input);
  }

  @Query(() => [Role])
  async roles(@Arg('where') where: RolesWhereInput) {
    console.log(where);
    // return 'ok';
    return await this.roleService.role(where);
  }
}
