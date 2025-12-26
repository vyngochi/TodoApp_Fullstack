import { useState } from "react";
import { useGetTodoDates } from "../api/TodoService";
import * as S from "./styles/Calendar.styled";
import dayjs from "dayjs";
import { TasksCalendar } from "../components/common/TasksCalendar";
import VerticalWeekCalendar from "../components/common/VerticalCalendar";

export default function Calendar() {
  const [month, setMonth] = useState<Date>(new Date());

  const from = dayjs(month).startOf("month").toISOString();
  const to = dayjs(month).endOf("month").toISOString();

  const { data: dates, isError, error } = useGetTodoDates(from, to);

  if (isError) {
    alert("errror" + (error as Error).message);
  }
  const todoDates = new Set(dates);

  return (
    <S.CalendarWrapper>
      <S.Title>Calendar</S.Title>
      <S.CalendarContent>
        <div>
          <TasksCalendar
            key={"horizontal"}
            month={month}
            setMonth={setMonth}
            todoDates={todoDates}
          />
        </div>
        <div>
          <VerticalWeekCalendar />
        </div>
      </S.CalendarContent>
    </S.CalendarWrapper>
  );
}
