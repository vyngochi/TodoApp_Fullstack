import { useState, useMemo } from "react";
import {
  format,
  addWeeks,
  subWeeks,
  startOfWeek,
  addDays,
  isSameDay,
} from "date-fns";
import { enUS } from "date-fns/locale";
import {
  CalendarContainer,
  NavHeader,
  WeekList,
  DayItem,
  DateCircle,
  DateInfo,
} from "./styles/VerticalCalendar.styled";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function VerticalWeekCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );

  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }).map((_, i) =>
      addDays(currentWeekStart, i)
    );
  }, [currentWeekStart]);

  const nextWeek = () => setCurrentWeekStart((prev) => addWeeks(prev, 1));
  const prevWeek = () => setCurrentWeekStart((prev) => subWeeks(prev, 1));

  return (
    <CalendarContainer>
      <NavHeader>
        <button onClick={prevWeek}>
          <ChevronLeft />
        </button>
        <h3>
          {format(currentWeekStart, "'Week' w - MMM yyyy", { locale: enUS })}
        </h3>
        <button onClick={nextWeek}>
          <ChevronRight />
        </button>
      </NavHeader>

      <WeekList>
        {weekDays.map((day) => {
          const isSelected = isSameDay(day, selectedDate);
          return (
            <DayItem
              key={day.toISOString()}
              active={isSelected}
              onClick={() => setSelectedDate(day)}
            >
              <DateCircle active={isSelected}>{format(day, "d")}</DateCircle>
              <DateInfo>
                <span className="day-name">
                  {format(day, "EEEE", { locale: enUS })}
                </span>
                <span className="full-date">{format(day, "dd/MM/yyyy")}</span>
              </DateInfo>
            </DayItem>
          );
        })}
      </WeekList>
    </CalendarContainer>
  );
}
