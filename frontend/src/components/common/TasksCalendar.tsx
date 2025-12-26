import { useState } from "react";
import { DayPicker, type DayButtonProps } from "react-day-picker";
import { Popover, Portal, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { CalendarWrapper } from "./styles/TasksCalendar.styled";
import "react-day-picker/dist/style.css";
import { useGetTodoByDate, useUpdateTodo } from "@/api/TodoService";
import { Checkbox } from "antd";
import { useNotification } from "./NotificationStack";
import { getErrorMessage } from "@/utils/errorHandler";
import { TODO_TITLE } from "@/utils/Messages/TodoMessage";
import type { TodoModel } from "@/model/TodoModel";

// interface TodoModel {
//   Id: number;
//   Title: string;
//   DueDate: string;
// }

interface CalendarProps {
  month: Date;
  setMonth: (v: Date) => void;
  todoDates: Set<string>;
  todos?: TodoModel[];
}

export function TasksCalendar({ month, setMonth, todoDates }: CalendarProps) {
  const [openDate, setOpenDate] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState<Record<number, boolean>>({});

  const { data: todoByDate, error } = useGetTodoByDate(openDate);

  const updateTodo = useUpdateTodo();

  const { showError } = useNotification();

  if (error) {
    alert((error as Error).message);
  }

  const handleUpdateTodo = (todo: TodoModel) => {
    updateTodo.mutate(
      {
        todoId: todo.Id || 0,
        payload: {
          IsCompleted: !(isCompleted[todo.Id || 0] ?? todo.IsCompleted),
        },
      },
      {
        onError: (error) => {
          const err = getErrorMessage(error);
          showError(TODO_TITLE.UPDATE_TODO, err);
        },
      }
    );
  };

  const CustomDayButton = (props: DayButtonProps) => {
    const { day, modifiers, ...buttonProps } = props;
    const dateStr = dayjs(day.date).format("YYYY-MM-DD");
    const hasTodo = modifiers.hasTodo;
    const isOpen = openDate === dateStr;

    const handleClick = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      buttonProps.onClick?.(e);

      if (hasTodo) {
        setOpenDate((prev) => (prev === dateStr ? null : dateStr));
      }
    };

    if (!hasTodo) {
      return <button {...buttonProps}>{day.date.getDate()}</button>;
    }

    return (
      <Popover.Root
        key={dateStr}
        open={isOpen}
        onOpenChange={(detail) => {
          if (!detail.open) setOpenDate(null);
        }}
        portalled
      >
        <Popover.Trigger asChild>
          <button
            {...buttonProps}
            onClick={handleClick}
            style={{ position: "relative" }}
          >
            {day.date.getDate()}
          </button>
        </Popover.Trigger>

        <Portal>
          <Popover.Positioner>
            <Popover.Content
              bg="white"
              p={3}
              shadow="lg"
              borderRadius="md"
              zIndex={2000}
            >
              <Popover.Arrow />
              <Popover.Body>
                <Text
                  fontFamily={"Lexend"}
                  fontWeight="bold"
                  mb={2}
                  color="blue.600"
                >
                  Tasks on {dayjs(day.date).format("DD/MM")}
                </Text>

                {todoByDate?.data?.map((todo) => (
                  <Text
                    key={todo.Id}
                    fontSize="sm"
                    fontFamily={"Lexend"}
                    py={1}
                    borderBottom="1px solid #f0f0f0"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignContent: "center",
                      alignItems: "center",
                      textDecoration:
                        isCompleted[todo.Id || 0] || todo.IsCompleted
                          ? "line-through"
                          : "none",
                    }}
                  >
                    • {todo.Title}
                    <Checkbox
                      checked={isCompleted[todo.Id || 0] || todo.IsCompleted}
                      onChange={(e) => {
                        e.nativeEvent.stopImmediatePropagation();
                        e.stopPropagation();
                        setIsCompleted((prev) => ({
                          ...prev,
                          [todo.Id || 0]: !prev[todo.Id || 0],
                        }));
                        handleUpdateTodo(todo);
                      }}
                    />
                  </Text>
                ))}
              </Popover.Body>
            </Popover.Content>
          </Popover.Positioner>
        </Portal>
      </Popover.Root>
    );
  };

  return (
    <CalendarWrapper>
      <DayPicker
        mode="single"
        month={month}
        onMonthChange={setMonth}
        modifiers={{
          hasTodo: (date) => todoDates.has(dayjs(date).format("YYYY-MM-DD")),
        }}
        modifiersClassNames={{
          hasTodo: "day-has-todo",
        }}
        components={{
          DayButton: CustomDayButton,
        }}
      />
    </CalendarWrapper>
  );
}
