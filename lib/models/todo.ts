import { prisma } from '../prisma';
import { Todo } from '../types';

export const createTodo = async (data: Todo) => {
  return await prisma.todo.create({
    data,
  });
};

export const getAllTodos = async (userId: string) => {
  return await prisma.todo.findMany({
    where: {
      userId,
    },
  });
};

export const updateTodoById = async (id: string) => {
  return await prisma.todo.findMany({
    where: {
      id,
    },
  });
};

export const deleteTodoById = async (id: string) => {
  return await prisma.todo.delete({
    where: {
      id,
    },
  });
};
