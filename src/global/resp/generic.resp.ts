import { ClassType, Field, Int, ObjectType } from 'type-graphql';

export const GenericResp = <T>(getNodesType: () => [ClassType<T>]) => {
  @ObjectType({ isAbstract: true })
  abstract class GenericRespClass {
    @Field(() => Int) count: number;
    @Field(getNodesType) items: T[];
  }
  return GenericRespClass;
};
