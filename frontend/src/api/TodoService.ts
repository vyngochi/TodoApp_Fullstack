import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../config/axiosConfig";
import type { ResponseModel } from "../model/ResponseModel";
import type { TodoModel, UpdateTodoPayload } from "../model/TodoModel";

//READ
export const useGetTodos = () => {
  return useQuery({
    queryKey: ["Todos"],
    queryFn: async () => {
      const response = await api.get<ResponseModel<TodoModel[]>>(
        "/todoapp/todos"
      );
      return response.data;
    },
  });
};

//CREATE
export const useCreateTodo = () => {
  return useMutation({
    mutationKey: ["CreateTodo"],
    mutationFn: async (payload: TodoModel) => {
      const res = await api.post<ResponseModel<TodoModel>>(
        "/todoapp/todos",
        payload
      );
      return res.data;
    },
  });
};

//DELETE
export const useDeleteTodo = () => {
  return useMutation({
    mutationKey: ["Delete"],
    mutationFn: async (todoId: number) => {
      const response = await api.delete<ResponseModel<any>>(
        `/todoapp/todos/${todoId}`
      );
      return response.data;
    },
  });
};

//UPDATE
export const useUpdateTodo = () => {
  return useMutation({
    mutationKey: ["Update"],
    mutationFn: async ({
      todoId,
      payload,
    }: {
      todoId: number;
      payload: UpdateTodoPayload;
    }) => {
      const response = await api.put<ResponseModel<TodoModel>>(
        `/todoapp/todos/${todoId}`,
        payload
      );
      return response.data;
    },
  });
};

//READ
export const useGetTodoDates = (from: string, to: string) => {
  return useQuery({
    queryKey: ["dates", from, to],
    queryFn: async () => {
      const response = await api.get<ResponseModel<string[]>>(
        "/todoapp/todos/dates",
        { params: { from, to } }
      );
      return response.data.data as string[];
    },
  });
};

//READ
export const useGetTodoByDate = (date: string | null) => {
  return useQuery({
    queryKey: ["TodosByDate", date],
    queryFn: async () => {
      const response = await api.get<ResponseModel<TodoModel[]>>(
        `todoapp/todos/by-date`,
        { params: { date } }
      );
      return response.data;
    },
    enabled: !!date,
  });
};
