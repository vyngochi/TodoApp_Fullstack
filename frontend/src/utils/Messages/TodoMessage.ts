//TITLE
export const TODO_TITLE = {
  ADD_TODO: "Create Todo",
  UPDATE_TODO: "Update Todo",
  DELETE_TODO: "Delete Todo",
};

export const TODO_MESSAGE = {
  ADD_SUCCESS: "Todo is added successfully",
  UPDATE_SUCCESS: "Todo is updated successfully",
  DELETE_SUCCESS: (todoName: string) =>
    `Todo ${todoName} is deleted successfully`,
};
