import { useState } from "react";
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

interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
}

type FilterType = "all" | "active" | "completed";

export default function MyTasks() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      const newTodo: Todo = {
        id: Date.now().toString(),
        title: inputValue,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      setTodos([newTodo, ...todos]);
      setInputValue("");
    }
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleCompleteTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleStartEdit = (id: string, title: string) => {
    setEditingId(id);
    setEditValue(title);
  };

  const handleSaveEdit = (id: string) => {
    if (editValue.trim()) {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, title: editValue } : todo
        )
      );
      setEditingId(null);
      setEditValue("");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditValue("");
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const completedCount = todos.filter((t) => t.completed).length;
  const activeCount = todos.filter((t) => !t.completed).length;

  return (
    <Container>
      <ContentWrapper>
        <Header>
          <Title>My Tasks</Title>
          <SubTitle>Organize your day, one task at a time</SubTitle>
        </Header>

        <Stats>
          <StatItem>
            <StatNumber>{todos.length}</StatNumber>
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
              onKeyDown={(e: any) => e.key === "Enter" && handleAddTodo()}
            />
            <AddButton onClick={handleAddTodo}>
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
          {filteredTodos.length === 0 ? (
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
            filteredTodos.map((todo) => (
              <TodoItem key={todo.id} completed={todo.completed}>
                {editingId === todo.id ? (
                  <EditInputWrapper>
                    <EditInput
                      type="text"
                      value={editValue}
                      onChange={(e: any) => setEditValue(e.target.value)}
                      onKeyDown={(e: any) =>
                        e.key === "Enter" && handleSaveEdit(todo.id)
                      }
                      autoFocus
                    />
                    <SaveButton onClick={() => handleSaveEdit(todo.id)}>
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
                        completed={todo.completed}
                        onClick={() => handleCompleteTodo(todo.id)}
                        title={
                          todo.completed
                            ? "Mark as incomplete"
                            : "Mark as complete"
                        }
                      >
                        ✓
                      </CompleteButton>
                      <TodoText completed={todo.completed}>
                        {todo.title}
                      </TodoText>
                    </TodoContent>
                    <TodoActions>
                      <EditButton
                        onClick={() => handleStartEdit(todo.id, todo.title)}
                      >
                        Edit
                      </EditButton>
                      <DeleteButton onClick={() => handleDeleteTodo(todo.id)}>
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
  );
}
