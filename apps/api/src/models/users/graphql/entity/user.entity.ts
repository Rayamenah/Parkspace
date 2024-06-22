import { ObjectType } from '@nestjs/graphql'
import { User as UserType } from '@prisma/client'
import { IsOptional } from 'class-validator'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class User implements RestrictProperties<User, UserType> {
  uid: string
  createdAt: Date
  updatedAt: Date
  @IsOptional()
  name: string
  @IsOptional()
  image: string
  // Todo Add below to make optional fields optional.
  // @Field({ nullable: true })
}
