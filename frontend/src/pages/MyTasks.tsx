import { useRef, useState } from "react";
import * as S from "./styles/MyTasks.styled";
import {
  useCreateTodo,
  useDeleteTodo,
  useGetTodos,
  useUpdateTodo,
} from "../api/TodoService";
import { useNotification } from "../components/common/NotificationStack";
import { getErrorMessage } from "../utils/errorHandler";
import { TODO_MESSAGE, TODO_TITLE } from "../utils/Messages/TodoMessage";
import type { TodoModel } from "../model/TodoModel";
import { useQueryClient } from "@tanstack/react-query";
import ChooseDueDatePopup from "../components/modals/ChooseDueDatePopup";
import { fireConfetti } from "../utils/Effects/canvasConfetti";
import dayjs from "dayjs";

type FilterType = "all" | "active" | "completed";

export default function MyTasks() {
  const { showSuccess, showError, showWarning } = useNotification();
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [isOpenDateChosen, setIsOpenDateChosen] = useState(false);
  const [dueDate, setDueDate] = useState<Date | undefined>(new Date());
  const addButtonRef = useRef<HTMLButtonElement>(null);

  const { data: todosApi, refetch } = useGetTodos();

  const queryClient = useQueryClient();

  const createTodo = useCreateTodo();
  const deleteTodo = useDeleteTodo();
  const updateTodo = useUpdateTodo();

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      createTodo.mutate(
        {
          Title: inputValue,
          IsCompleted: false,
          DueDate: dayjs(dueDate).toISOString() || null,
        },
        {
          onSuccess: async (data) => {
            if (data.statusCode === 200) {
              return showWarning(TODO_TITLE.ADD_TODO, data.message || "");
            }

            await refetch();

            if (addButtonRef.current) {
              fireConfetti(addButtonRef.current);
            }

            showSuccess(
              TODO_TITLE.ADD_TODO,
              data.message || TODO_MESSAGE.ADD_SUCCESS
            );
            setIsOpenDateChosen(false);
          },
          onError: (error) => {
            const err = getErrorMessage(error);

            showError(TODO_TITLE.ADD_TODO, err);
          },
        }
      );

      setInputValue("");
    }
  };

  const handleDeleteTodo = (id: number, name: string) => {
    deleteTodo.mutate(id, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["Todos"] });
        await refetch();
        showSuccess(TODO_TITLE.DELETE_TODO, TODO_MESSAGE.DELETE_SUCCESS(name));
      },
      onError: (error) => {
        const err = getErrorMessage(error);
        showError(TODO_TITLE.DELETE_TODO, err);
      },
    });
  };

  const handleCompleteTodo = (todo: TodoModel) => {
    updateTodo.mutate(
      { todoId: todo.Id ?? 0, payload: { IsCompleted: !todo.IsCompleted } },
      { onSuccess: () => refetch() }
    );
  };

  const handleStartEdit = (id: number, title: string) => {
    setEditingId(id);
    setEditValue(title);
  };

  const handleSaveEdit = (id: number) => {
    if (editValue.trim()) {
      updateTodo.mutate(
        { todoId: id, payload: { Title: editValue } },
        {
          onSuccess: (data) => {
            refetch();
            showSuccess(
              TODO_TITLE.UPDATE_TODO,
              data.message || TODO_MESSAGE.UPDATE_SUCCESS
            );
          },
          onError: (error) => {
            const err = getErrorMessage(error);
            showError(TODO_TITLE.UPDATE_TODO, err);
          },
        }
      );
      setEditingId(null);
      setEditValue("");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditValue("");
  };

  const filteredTodos = todosApi?.data?.filter((todo) => {
    if (filter === "active") return !todo.IsCompleted;
    if (filter === "completed") return todo.IsCompleted;
    return true;
  });

  const completedCount =
    todosApi?.data?.filter((t) => t.IsCompleted).length ?? 0;
  const activeCount = todosApi?.data?.filter((t) => !t.IsCompleted).length ?? 0;

  return (
    <>
      <S.Container>
        <S.ContentWrapper>
          <S.Header>
            <S.Title>My Tasks</S.Title>
            <S.SubTitle>Organize your day, one task at a time</S.SubTitle>
          </S.Header>

          <S.Stats>
            <S.StatItem>
              <S.StatNumber>{todosApi?.data?.length ?? 0}</S.StatNumber>
              <S.StatLabel>Total</S.StatLabel>
            </S.StatItem>
            <S.StatItem>
              <S.StatNumber>{activeCount}</S.StatNumber>
              <S.StatLabel>Active</S.StatLabel>
            </S.StatItem>
            <S.StatItem>
              <S.StatNumber>{completedCount}</S.StatNumber>
              <S.StatLabel>Completed</S.StatLabel>
            </S.StatItem>
          </S.Stats>

          <S.InputSection>
            <S.InputWrapper>
              <S.Input
                type="text"
                placeholder="Add a new task..."
                value={inputValue}
                onChange={(e: any) => setInputValue(e.target.value)}
                onKeyDown={(e: any) =>
                  e.key === "Enter" && setIsOpenDateChosen(true)
                }
              />
              <S.AddButton
                disabled={!inputValue}
                $disabled={!inputValue}
                onClick={() => setIsOpenDateChosen(true)}
                ref={addButtonRef}
              >
                <span>+</span> Add Task
              </S.AddButton>
            </S.InputWrapper>
          </S.InputSection>

          <S.FilterSection>
            <S.FilterButton
              active={filter === "all"}
              onClick={() => setFilter("all")}
            >
              All
            </S.FilterButton>
            <S.FilterButton
              active={filter === "active"}
              onClick={() => setFilter("active")}
            >
              Active
            </S.FilterButton>
            <S.FilterButton
              active={filter === "completed"}
              onClick={() => setFilter("completed")}
            >
              Completed
            </S.FilterButton>
          </S.FilterSection>

          <S.TodoList>
            {!filteredTodos || filteredTodos.length === 0 ? (
              <S.EmptyState>
                <p>
                  {filter === "all"
                    ? "No tasks yet. Create one to get started!"
                    : filter === "active"
                    ? "All tasks completed! 🎉"
                    : "No completed tasks yet."}
                </p>
              </S.EmptyState>
            ) : (
              filteredTodos?.reverse().map((todo) => (
                <S.TodoItem key={todo.Id} completed={todo.IsCompleted}>
                  {editingId === todo.Id ? (
                    <S.EditInputWrapper>
                      <S.EditInput
                        type="text"
                        value={editValue}
                        onChange={(e: any) => setEditValue(e.target.value)}
                        onKeyDown={(e: any) =>
                          e.key === "Enter" && handleSaveEdit(todo.Id ?? 0)
                        }
                        autoFocus
                      />
                      <S.SaveButton
                        onClick={() => handleSaveEdit(todo.Id ?? 0)}
                      >
                        Save
                      </S.SaveButton>
                      <S.CancelButton onClick={handleCancelEdit}>
                        Cancel
                      </S.CancelButton>
                    </S.EditInputWrapper>
                  ) : (
                    <>
                      <S.TodoContent>
                        <S.CompleteButton
                          completed={todo.IsCompleted}
                          onClick={() => handleCompleteTodo(todo)}
                          title={
                            todo.IsCompleted
                              ? "Mark as incomplete"
                              : "Mark as complete"
                          }
                        >
                          ✓
                        </S.CompleteButton>
                        <S.TodoText completed={todo.IsCompleted}>
                          {todo.Title}
                        </S.TodoText>
                      </S.TodoContent>
                      <S.TodoActions>
                        <S.EditButton
                          onClick={() =>
                            handleStartEdit(todo.Id ?? 0, todo.Title)
                          }
                        >
                          Edit
                        </S.EditButton>
                        <S.DeleteButton
                          onClick={() =>
                            handleDeleteTodo(todo.Id ?? 0, todo.Title)
                          }
                        >
                          Delete
                        </S.DeleteButton>
                      </S.TodoActions>
                    </>
                  )}
                </S.TodoItem>
              ))
            )}
          </S.TodoList>
        </S.ContentWrapper>
      </S.Container>
      {isOpenDateChosen && (
        <ChooseDueDatePopup
          isOpenModal={isOpenDateChosen}
          setIsOpenModal={setIsOpenDateChosen}
          selected={dueDate}
          setSelected={setDueDate}
          onAccept={() => handleAddTodo()}
        />
      )}
    </>
  );
}
