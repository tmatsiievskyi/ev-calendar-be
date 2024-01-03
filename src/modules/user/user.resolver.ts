import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { Inject, Service } from 'typedi';

import { IContext } from '../../global/_interfaces';

import { User } from './user.entity';
import { CreateUserInput } from './user.input';
import { UserService } from './user.service';

@Service()
@Resolver(() => User)
export class UserResolver {
  @Inject(() => UserService)
  userService: UserService;

  @Mutation(() => User)
  signUp(@Arg('input') input: CreateUserInput, @Ctx() context: IContext) {
    return this.userService.createUser(input, context);
  }
}
