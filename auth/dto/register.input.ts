import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, IsOptional } from 'class-validator';

@InputType()
export class RegisterInput {
  @Field()
  @IsString()
  nombre: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  password: string;

  @Field( { nullable: true } )
  @IsOptional()
  rol?: string;
}
