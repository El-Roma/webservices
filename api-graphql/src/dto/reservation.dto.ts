import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsDate, IsNumber } from 'class-validator';

@InputType()
export class CreateReservationInput {
  @Field(() => ID)
  @IsNotEmpty()
  user_id: number;

  @Field(() => ID)
  @IsNotEmpty()
  room_id: number;

  @Field()
  @IsNotEmpty()
  @IsDate()
  start_time: Date;

  @Field()
  @IsNotEmpty()
  @IsDate()
  end_time: Date;
}

@InputType()
export class UpdateReservationInput {
  @Field(() => ID, { nullable: true })
  user_id?: number;

  @Field(() => ID, { nullable: true })
  room_id?: number;

  @Field({ nullable: true })
  @IsDate()
  start_time?: Date;

  @Field({ nullable: true })
  @IsDate()
  end_time?: Date;
} 