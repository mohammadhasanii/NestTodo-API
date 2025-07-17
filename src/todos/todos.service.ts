import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { User } from '@prisma/client';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
    constructor(private prisma: PrismaService) { }

    create(createTodoDto: CreateTodoDto, user: User) {
        return this.prisma.todo.create({
            data: {
                ...createTodoDto,
                userId: user.id,
            },
        });
    }

    findAll(user: User) {
    return this.prisma.todo.findMany({
        where: {
            userId: user.id,
        },
        select: {
            id: true,
            title: true,
            description: true,
            isCompleted: true,
            createdAt: true,
        },
    });
}

    async update(id: string, updateTodoDto: UpdateTodoDto, user: User) {
        const todo = await this.prisma.todo.findUnique({ where: { id } });
        if (!todo || todo.userId !== user.id) {
            throw new NotFoundException(`Todo with ID "${id}" not found.`);
        }
        return this.prisma.todo.update({
            where: { id },
            data: updateTodoDto,
        });
    }

    async remove(id: string, user: User) {
        const todo = await this.prisma.todo.findUnique({ where: { id } });
        if (!todo || todo.userId !== user.id) {
            throw new NotFoundException(`Todo with ID "${id}" not found.`);
        }
        await this.prisma.todo.delete({ where: { id } });
        return { message: 'Todo successfully deleted.' };
    }
}