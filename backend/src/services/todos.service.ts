import dayjs from "dayjs";
import prisma from "../config/prisma";

export const getTodosByUserId = async (userId: number) => {
  const todos = await prisma.todos.findMany({
    where: { UserId: userId },
    select: {
      Id: true,
      Title: true,
      IsCompleted: true,
      DueDate: true,
    },
  });

  return todos;
};

export const createTodo = async (
  userId: number,
  title: string,
  isCompleted: boolean,
  dueDate: Date
) => {
  const newTodo = await prisma.todos.create({
    data: {
      UserId: userId,
      Title: title,
      IsCompleted: isCompleted,
      DueDate: dueDate,
    },
    select: {
      Id: true,
      Title: true,
      IsCompleted: true,
      DueDate: true,
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

export const getTodosDates = async (userId: number, from: Date, to: Date) => {
  const dates = prisma.todos.findMany({
    where: { UserId: userId, DueDate: { gte: from, lte: to } },
    select: { DueDate: true },
  });

  return dates;
};

export const getTodosBySpecificDate = async (userId: number, date: string) => {
  const startOfDate = dayjs(date).startOf("day").toISOString();
  const endOfDate = dayjs(date).endOf("day").toISOString();

  const todos = await prisma.todos.findMany({
    where: {
      UserId: userId,
      DueDate: {
        gte: startOfDate,
        lt: endOfDate,
      },
    },
    select: {
      Id: true,
      Title: true,
      IsCompleted: true,
      DueDate: true,
    },
    orderBy: {
      DueDate: "asc",
    },
  });

  return todos;
};
