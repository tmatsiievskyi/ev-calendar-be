import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ArgsType, Field, InputType } from 'type-graphql';

import { Role } from './role.entity';

@InputType()
export class CreateRoleInput implements Partial<Role> {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, {
    message: '3 char min',
  })
  @MaxLength(30, {
    message: '30 char max',
  })
  @Field(() => String)
  name!: string;

  @IsBoolean()
  @Field(() => Boolean)
  is_default!: boolean;
}

interface FieldOptions {
  starts_with?: string;
  contains?: string;
}

export interface Fields {
  role_id?: FieldOptions;
}

@InputType()
export class StringWhere {
  @IsString()
  @Field(() => String, { nullable: true })
  starts_with?: string;

  @IsString()
  @Field(() => String, { nullable: true })
  contains?: string;
}

@InputType()
export class RolesWhereInput implements Partial<Role> {
  // @IsString()
  @Type(() => StringWhere)
  @Field(() => StringWhere, { nullable: true })
  name?: any;

  // @Type()
  // @IsNumber()
  @Field(() => Number, { nullable: true })
  role_id?: any;

  @Type(() => StringWhere)
  @Field(() => StringWhere, { nullable: true })
  is_default?: boolean;
}
