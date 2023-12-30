import bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Role } from '../role';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly user_id!: number;

  @Field(() => String)
  @Column({ unique: true })
  email!: string;

  @Column()
  @Exclude()
  password!: string;

  @Field(() => String)
  @Column()
  first_name!: string;

  @Field(() => String)
  @Column()
  last_name!: string;

  @Field(() => [Role])
  @OneToMany(() => Role, (role: Role) => role.role_id)
  role: Role[];

  @Field(() => Date)
  @Column()
  @CreateDateColumn()
  created_at!: Date;

  @Field(() => Date)
  @Column()
  @UpdateDateColumn()
  updated_at!: Date;

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  checkIfPasswordMatch(inputPassword: string) {
    return bcrypt.compare(this.password, inputPassword);
  }
}
