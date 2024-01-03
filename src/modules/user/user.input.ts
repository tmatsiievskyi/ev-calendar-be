import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

import { User } from './user.entity';

@InputType()
export class CreateUserInput implements Partial<User> {
  @IsNotEmpty()
  @IsEmail()
  @Field(() => String)
  email: string;

  @MinLength(6, {
    message: '6 char min',
  })
  @MaxLength(30, {
    message: '30 char max',
  })
  @Field(() => String)
  password: string;

  @IsNotEmpty()
  @Field(() => String)
  first_name: string;

  @IsNotEmpty()
  @Field(() => String)
  last_name: string;
}
