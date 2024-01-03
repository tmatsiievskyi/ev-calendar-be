import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Role extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly role_id!: number;

  @Field(() => String)
  @Column({
    unique: true,
  })
  name!: string;

  @Field(() => Boolean)
  @Column({ default: false })
  is_default!: boolean;
}
