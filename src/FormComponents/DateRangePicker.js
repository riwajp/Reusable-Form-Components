import DatePicker from "react-datepicker";
import { useState, useEffect } from "react";
import { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateRangePicker = ({
  renderHead,
  renderDay,
  render,
  valueClassName,
 default_value,

  months,

  onChange
}) => {

  const [selected_values,setSelectedValues]=useState(default_value ? default_value : {start:new Date(),end:new Date()});
  
  useEffect(()=>{
    if(onChange){
      onChange(selected_values)
    }

  },[selected_values])


  

  const dates = selected_values
  const start_date = dates.start;
  const end_date = dates.end;

  //month to be displayed on calendar
  const [calendar_end_month, setCalendarEndMonth] = useState(
    end_date.getMonth()
  );
  const [calendar_start_month, setCalendarStartMonth] = useState(
    start_date.getMonth()
  );

  //calendar container
  const MyContainer = ({ className, children }) => {
    return (
      <div className=" px-1 py-0.2 pt-1   ">
        <CalendarContainer className={className}>
          <div className="relative ">{children}</div>
        </CalendarContainer>
      </div>
    );
  };

  const customHeader = (
    {
      date,

      changeMonth,
      increaseYear,
      decreaseYear,
    },
    setCalendarMonth,
    calendar_month
  ) => {
    /*  if (calendar_month !== date.getMonth()) {
      changeMonth(calendar_month);
    }
    */
    return renderHead({
      decreaseYear,
      decreaseMonth: () => {
        if (date.getMonth() === 0) {
          decreaseYear();
          setCalendarMonth(11);
          changeMonth(11);
        } else {
          setCalendarMonth(calendar_month - 1);
          changeMonth(calendar_month - 1);
        }
      },
      increaseYear,
      increaseMonth: () => {
        if (date.getMonth() === 11) {
          increaseYear();
          setCalendarMonth(0);
          changeMonth(0);
        } else {
          setCalendarMonth(calendar_month + 1);
          changeMonth(calendar_month + 1);
        }
      },
      date: date,
    });
  };
  const customHeaderStart = (p) =>
    customHeader(p, setCalendarStartMonth, calendar_start_month);

  const customHeaderEnd = (p) =>
    customHeader(p, setCalendarEndMonth, calendar_end_month);

  // individual day component of calendar
  const renderDayContents = (day, date, date_type) => {
    const calendar_selected_month =
      date_type === "end" ? calendar_end_month : calendar_start_month;
    const setCalendarSelectedMonth =
      date_type === "end" ? setCalendarEndMonth : setCalendarStartMonth;
    const selected_date = date_type === "end" ? end_date : start_date;

    return renderDay({
      day,
      selected_date,
      date,
      start_date,
      end_date,
      calendar_selected_month,
      setCalendarSelectedMonth,
    });
  };



  const handleChange = (date_type, t_start_date, t_end_date) => {
    if (date_type === "start") {
      setSelectedValues({start: new Date(t_start_date.setHours(0, 0, 0, 0)), end:end_date});
    } else {
      setSelectedValues({start:start_date,end:new Date(t_end_date.setHours(0, 0, 0, 0))});
    }
  };

  return render(
    DatePicker,
    {
      selected: start_date,
      onChange: (date) => handleChange("start", date, end_date),
      className: valueClassName,
      calendarContainer: MyContainer,
      renderCustomHeader: customHeaderStart,
      renderDayContents: (day, date) => renderDayContents(day, date, "start"),
      showPopperArrow: true,
      selectsStart: true,
      start_date: start_date,
      end_date: end_date,
      value:
        start_date.getDate() +
        " " +
        months[start_date.getMonth()] +
        ", " +
        start_date.getFullYear(),
      adjustDateOnChange: true,
    },
    {
      selected: end_date,
      onChange: (date) => handleChange("end", start_date, date),
      className: valueClassName,
      calendarContainer: MyContainer,
      renderCustomHeader: customHeaderEnd,
      renderDayContents: (day, date) => renderDayContents(day, date, "end"),
      showPopperArrow: true,
      selectsEnd: true,
      start_date: start_date,
      end_date: end_date,
      value:
        end_date.getDate() +
        " " +
        months[end_date.getMonth()] +
        ", " +
        end_date.getFullYear(),
      adjustDateOnChange: true,
    }
  );
};
export default DateRangePicker;
