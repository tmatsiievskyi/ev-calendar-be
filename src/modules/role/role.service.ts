import { Service } from 'typedi';
import { getRepository } from 'typeorm';

import { AppError, getErrorMessage } from '../../global/resp';
import { User } from '../user';

import { Role } from './role.entity';
import { CreateRoleInput, RolesWhereInput } from './role.input';

@Service()
export class RoleService {
  async createRole(input: CreateRoleInput) {
    try {
      const newRole = Role.create(input);
      const savedEvent = await newRole.save();
      return savedEvent;
    } catch (error) {
      throw new AppError(error);
    }
  }

  async role(where: RolesWhereInput): Promise<Role[]> {
    try {
      const role = await Role.createQueryBuilder()
        .select('role')
        .from(Role, 'role')
        .where('role.is_default = :is_default', { is_default: true })
        .getOne();
      // const data = (await Role.query(
      //   'SELECT * FROM role WHERE is_default = true'
      // )) as Role;
      const data = await Role.find({ where: { is_default: true } });
      console.log(role);
      return data;
    } catch (error) {
      throw new AppError(error);
    }
  }
}
