import { ObjectType } from 'type-graphql';

import { GenericResp } from '../../global/resp/generic.resp';

import { Role } from '.';

@ObjectType()
export class RoleResp extends GenericResp(() => [Role]) {}
