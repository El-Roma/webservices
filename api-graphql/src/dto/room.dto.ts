import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateRoomInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  capacity: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  location?: string;
}

@InputType()
export class UpdateRoomInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  capacity?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  location?: string;
} 