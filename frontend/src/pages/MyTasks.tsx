import { useRef, useState } from "react";
import {
  Container,
  Header,
  Title,
  SubTitle,
  InputSection,
  InputWrapper,
  Input,
  AddButton,
  TodoList,
  TodoItem,
  TodoContent,
  TodoText,
  TodoActions,
  EditButton,
  DeleteButton,
  CompleteButton,
  EmptyState,
  Stats,
  StatItem,
  StatNumber,
  StatLabel,
  SaveButton,
  CancelButton,
  EditInputWrapper,
  EditInput,
  FilterSection,
  FilterButton,
  ContentWrapper,
} from "./styles/MyTasks.styled";
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

type FilterType = "all" | "active" | "completed";

export default function MyTasks() {
  const { showSuccess, showError } = useNotification();
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
          DueDate: dueDate?.toISOString() || null,
        },
        {
          onSuccess: async (data) => {
            if (addButtonRef.current) {
              fireConfetti(addButtonRef.current);
            }
            await refetch();
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
      <Container>
        <ContentWrapper>
          <Header>
            <Title>My Tasks</Title>
            <SubTitle>Organize your day, one task at a time</SubTitle>
          </Header>

          <Stats>
            <StatItem>
              <StatNumber>{todosApi?.data?.length ?? 0}</StatNumber>
              <StatLabel>Total</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>{activeCount}</StatNumber>
              <StatLabel>Active</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>{completedCount}</StatNumber>
              <StatLabel>Completed</StatLabel>
            </StatItem>
          </Stats>

          <InputSection>
            <InputWrapper>
              <Input
                type="text"
                placeholder="Add a new task..."
                value={inputValue}
                onChange={(e: any) => setInputValue(e.target.value)}
                onKeyDown={(e: any) =>
                  e.key === "Enter" && setIsOpenDateChosen(true)
                }
              />
              <AddButton
                disabled={!inputValue}
                $disabled={!inputValue}
                onClick={() => setIsOpenDateChosen(true)}
                ref={addButtonRef}
              >
                <span>+</span> Add Task
              </AddButton>
            </InputWrapper>
          </InputSection>

          <FilterSection>
            <FilterButton
              active={filter === "all"}
              onClick={() => setFilter("all")}
            >
              All
            </FilterButton>
            <FilterButton
              active={filter === "active"}
              onClick={() => setFilter("active")}
            >
              Active
            </FilterButton>
            <FilterButton
              active={filter === "completed"}
              onClick={() => setFilter("completed")}
            >
              Completed
            </FilterButton>
          </FilterSection>

          <TodoList>
            {!filteredTodos || filteredTodos.length === 0 ? (
              <EmptyState>
                <p>
                  {filter === "all"
                    ? "No tasks yet. Create one to get started!"
                    : filter === "active"
                    ? "All tasks completed! 🎉"
                    : "No completed tasks yet."}
                </p>
              </EmptyState>
            ) : (
              filteredTodos?.reverse().map((todo) => (
                <TodoItem key={todo.Id} completed={todo.IsCompleted}>
                  {editingId === todo.Id ? (
                    <EditInputWrapper>
                      <EditInput
                        type="text"
                        value={editValue}
                        onChange={(e: any) => setEditValue(e.target.value)}
                        onKeyDown={(e: any) =>
                          e.key === "Enter" && handleSaveEdit(todo.Id ?? 0)
                        }
                        autoFocus
                      />
                      <SaveButton onClick={() => handleSaveEdit(todo.Id ?? 0)}>
                        Save
                      </SaveButton>
                      <CancelButton onClick={handleCancelEdit}>
                        Cancel
                      </CancelButton>
                    </EditInputWrapper>
                  ) : (
                    <>
                      <TodoContent>
                        <CompleteButton
                          completed={todo.IsCompleted}
                          onClick={() => handleCompleteTodo(todo)}
                          title={
                            todo.IsCompleted
                              ? "Mark as incomplete"
                              : "Mark as complete"
                          }
                        >
                          ✓
                        </CompleteButton>
                        <TodoText completed={todo.IsCompleted}>
                          {todo.Title}
                        </TodoText>
                      </TodoContent>
                      <TodoActions>
                        <EditButton
                          onClick={() =>
                            handleStartEdit(todo.Id ?? 0, todo.Title)
                          }
                        >
                          Edit
                        </EditButton>
                        <DeleteButton
                          onClick={() =>
                            handleDeleteTodo(todo.Id ?? 0, todo.Title)
                          }
                        >
                          Delete
                        </DeleteButton>
                      </TodoActions>
                    </>
                  )}
                </TodoItem>
              ))
            )}
          </TodoList>
        </ContentWrapper>
      </Container>
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
