import { Inject, Service } from 'typedi';

import { IContext } from '../../global/_interfaces';
import { RoleService } from '../role/role.service';

import { CreateUserInput } from './user.input';

@Service()
export class UserService {
  @Inject(() => RoleService)
  roleService: RoleService;

  async createUser(input: CreateUserInput, context: IContext) {
    const role = await this.roleService.role();
    console.log('aaaaa');
    console.log(role);

    return {
      email: 'asd',
      user_id: 1,
    };
  }
}
