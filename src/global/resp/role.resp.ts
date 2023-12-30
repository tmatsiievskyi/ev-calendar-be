import { ObjectType } from 'type-graphql';

import { Role } from '../../modules/role';

import { GenericResp } from './generic.resp';

@ObjectType()
export class RoleResp extends GenericResp(() => [Role]) {}
