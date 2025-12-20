export type TodoModel = {
  Id?: number;
  Title: string;
  IsCompleted: boolean;
  DueDate: string | null;
};

//Update request payload
export type UpdateTodoPayload = {
  Title?: string;
  IsCompleted?: boolean;
};
