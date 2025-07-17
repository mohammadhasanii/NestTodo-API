import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateTodoDto {
  @ApiProperty({
    required: false,
    example: 'Review the project PR',
    description: 'The updated title of the todo',
  })
  @IsString({ message: 'Title must be a string' })
  @IsOptional()
  title?: string;

  @ApiProperty({
    required: false,
    example: 'Check the new validation logic carefully',
    description: 'The updated description for the todo',
  })
  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  description?: string;

  @ApiProperty({
    required: false,
    example: true,
    description: 'The updated completion status of the todo',
  })
  @IsBoolean({ message: 'isCompleted must be a boolean' })
  @IsOptional()
  isCompleted?: boolean;
}