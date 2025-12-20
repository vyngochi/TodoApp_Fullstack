import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DayPicker } from "react-day-picker";
import { format, setHours, setMinutes } from "date-fns";
import { CalendarDays, Clock } from "lucide-react";
import "react-day-picker/dist/style.css";
import ConfirmAddTaskButton from "./ConfirmAddTaskButton";

const CalendarWrapper = styled.div`
  padding: 24px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(54, 79, 171, 0.1);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  width: fit-content;
  max-width: 100%;
  font-family: "Lexend", sans-serif;

  .rdp {
    --rdp-cell-size: 44px;
    --rdp-accent-color: #364fab;
    --rdp-background-color: rgba(54, 79, 171, 0.1);
    margin: 0;
  }

  .rdp-months {
    justify-content: center;
  }

  .rdp-month {
    background: transparent;
  }

  .rdp-caption {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 0 20px 0;
    margin-bottom: 12px;
    border-bottom: 2px solid rgba(54, 79, 171, 0.1);
  }

  .rdp-caption_label {
    font-size: 18px;
    font-weight: 700;
    color: #1a1a2e;
    text-transform: capitalize;
  }

  .rdp-nav {
    position: absolute;
    right: 0;
    display: flex;
    gap: 8px;
  }

  .rdp-nav_button {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: rgba(54, 79, 171, 0.05);
    border: 1px solid rgba(54, 79, 171, 0.1);
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
      background: rgba(54, 79, 171, 0.1);
      border-color: #364fab;
      transform: scale(1.05);
    }

    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
  }

  .rdp-head_cell {
    color: #666;
    font-weight: 600;
    font-size: 13px;
    text-transform: uppercase;
    padding: 8px 0;
  }

  .rdp-cell {
    padding: 2px;
  }

  .rdp-button {
    border-radius: 12px;
    font-size: 15px;
    font-weight: 500;
    color: #1a1a2e;
    transition: all 0.2s ease;
    border: 2px solid transparent;

    &:hover:not(.rdp-day_selected):not(.rdp-day_disabled) {
      background: rgba(54, 79, 171, 0.08);
      transform: scale(1.05);
    }
  }

  .rdp-day_selected {
    background: linear-gradient(135deg, #364fab 0%, #5a7de8 100%) !important;
    color: white !important;
    font-weight: 700;
    box-shadow: 0 4px 12px rgba(54, 79, 171, 0.3);
    transform: scale(1.05);
    border-color: transparent !important;
  }

  .rdp-day_today:not(.rdp-day_selected) {
    border-color: #364fab;
    font-weight: 700;
    color: #364fab;
  }

  .rdp-day_outside {
    opacity: 0.3;
  }

  .rdp-day_disabled {
    opacity: 0.25;
    cursor: not-allowed;
  }
`;

const Divider = styled.hr`
  margin: 20px 0;
  border: 0;
  border-top: 2px solid rgba(54, 79, 171, 0.1);
`;

const TimePickerSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: rgba(54, 79, 171, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(54, 79, 171, 0.1);
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #364fab 0%, #5a7de8 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    color: white;
    width: 20px;
    height: 20px;
  }
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 15px;
  color: #1a1a2e;
  flex-shrink: 0;
`;

const TimeInput = styled.input`
  padding: 10px 14px;
  border-radius: 10px;
  border: 2px solid rgba(54, 79, 171, 0.2);
  font-size: 15px;
  font-weight: 500;
  color: #1a1a2e;
  background: white;
  transition: all 0.2s ease;
  flex: 1;
  min-width: 120px;
  font-family: "Lexend", sans-serif;

  &:focus {
    outline: none;
    border-color: #364fab;
    box-shadow: 0 0 0 3px rgba(54, 79, 171, 0.1);
  }

  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
    filter: invert(25%) sepia(68%) saturate(1500%) hue-rotate(215deg);
  }
`;

const ResultBox = styled.div`
  margin-top: 20px;
  padding: 16px 20px;
  background: linear-gradient(
    135deg,
    rgba(54, 79, 171, 0.08) 0%,
    rgba(90, 125, 232, 0.08) 100%
  );
  border-radius: 12px;
  border: 2px solid rgba(54, 79, 171, 0.15);
  display: flex;
  align-items: center;
  gap: 12px;

  svg {
    color: #364fab;
    flex-shrink: 0;
  }
`;

const ResultText = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #1a1a2e;

  span {
    color: #364fab;
    font-weight: 700;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

interface AddTaskCalendarProps {
  selected: Date | undefined;
  setSelected: (v: Date | undefined) => void;
  onAccept: () => void;
}

export default function AddTaskCalendar({
  selected,
  setSelected,
  onAccept,
}: AddTaskCalendarProps) {
  const [timeValue, setTimeValue] = useState<string>("09:00");

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const time = e.target.value;
    setTimeValue(time);

    if (selected) {
      const [hours, minutes] = time.split(":").map(Number);
      const newDate = setHours(setMinutes(selected, minutes), hours);
      setSelected(newDate);
    }
  };

  const handleDaySelect = (date: Date | undefined): void => {
    if (!date) {
      setSelected(undefined);
      return;
    }
    const [hours, minutes] = timeValue.split(":").map(Number);
    const dateWithTime = setHours(setMinutes(date, minutes), hours);
    setSelected(dateWithTime);
  };

  useEffect(() => {
    console.log("time " + selected);
  }, [selected]);

  return (
    <CalendarWrapper>
      <DayPicker mode="single" selected={selected} onSelect={handleDaySelect} />

      <Divider />

      <TimePickerSection>
        <IconWrapper>
          <Clock />
        </IconWrapper>
        <Label htmlFor="task-time">Select Time:</Label>
        <TimeInput
          id="task-time"
          type="time"
          value={timeValue}
          onChange={handleTimeChange}
        />
      </TimePickerSection>

      <ResultBox>
        <CalendarDays size={20} />
        <ResultText>
          {selected ? (
            <>
              Due date: <span>{format(selected, "dd/MM/yyyy HH:mm")}</span>
            </>
          ) : (
            "Please select date and time"
          )}
        </ResultText>
      </ResultBox>
      <ButtonWrapper>
        <ConfirmAddTaskButton onClick={onAccept} text="Add Task" />
      </ButtonWrapper>
    </CalendarWrapper>
  );
}
