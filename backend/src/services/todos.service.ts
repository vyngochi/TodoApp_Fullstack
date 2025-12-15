import prisma from "../config/prisma";

export const getTodosByUserId = async (userId: number) => {
  const todos = await prisma.todos.findMany({
    where: { UserId: userId },
    select: {
      Id: true,
      Title: true,
      IsCompleted: true,
    },
  });

  return todos;
};

export const createTodo = async (
  userId: number,
  title: string,
  isCompleted: boolean
) => {
  const newTodo = await prisma.todos.create({
    data: {
      UserId: userId,
      Title: title,
      IsCompleted: isCompleted,
    },
    select: {
      Id: true,
      Title: true,
      IsCompleted: true,
    },
  });

  return newTodo;
};

export const updateTodo = async (
  todoId: number,
  newTitle: string,
  newIsCompleted: boolean
) => {
  const updatedTodo = await prisma.todos.update({
    where: { Id: todoId },
    data: {
      Title: newTitle,
      IsCompleted: newIsCompleted,
    },
    select: {
      Id: true,
      Title: true,
      IsCompleted: true,
    },
  });

  return updatedTodo;
};

export const deleteTodo = async (todoId: number) => {
  await prisma.todos.delete({
    where: { Id: todoId },
  });
};
