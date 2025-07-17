import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({
    example: 'Finish Golang project',
    description: 'The title of the new todo',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    required: false,
    example: 'Implement all CRUD operations and authentication',
    description: 'An optional description for the todo',
  })
  @IsString()
  @IsOptional()
  description?: string;
}