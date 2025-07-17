import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { User } from '@prisma/client';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Todos')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new todo' })
  @ApiResponse({ status: 201, description: 'Todo created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Validation failed.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  create(@Body() createTodoDto: CreateTodoDto, @GetUser() user: User) {
    return this.todosService.create(createTodoDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all todos for the logged-in user' })
  @ApiResponse({ status: 200, description: 'Returns an array of todos.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findAll(@GetUser() user: User) {
    return this.todosService.findAll(user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a todo by ID' })
  @ApiResponse({ status: 200, description: 'Todo updated successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Todo not found.' })
  update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @GetUser() user: User,
  ) {
    return this.todosService.update(id, updateTodoDto, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a todo by ID' })
  @ApiResponse({ status: 204, description: 'Todo successfully deleted.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Todo not found.' })
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.todosService.remove(id, user);
  }
}