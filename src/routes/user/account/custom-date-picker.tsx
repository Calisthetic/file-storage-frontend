import { FunctionComponent, forwardRef, useState } from "react";
import DatePicker from "react-datepicker";

import "./custom-date-picker.css";


interface CustomDatePickerProps {
  
}
 
const CustomDatePicker: FunctionComponent<CustomDatePickerProps> = () => {
  const currentDate = new Date()
  const [startDate, setStartDate] = useState(new Date());
  const years = Array(100).fill(currentDate.getFullYear() - 100).map((n, i) => n + i);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const ExampleCustomInput = forwardRef(({ value, onClick }:any, ref:any) => (
    <button className="rounded-md py-1 px-4 flex items-center gap-x-4
    border border-borderLight dark:border-borderDark" onClick={onClick} ref={ref}>
      <span>{value}</span>
      <svg id="Layer_1" version="1.1" viewBox="0 0 24 24" className="h-4 w-4 fill-none"
      xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24">
        <path d="M23.3 8.2v13.2c0 1-.8 1.9-1.9 1.9H2.6c-1 0-1.9-.8-1.9-1.9V8.2h22.6zM23.3 
        4.7v3.5H.8V4.7c0-1 .8-1.9 1.9-1.9h18.8c.9.1 1.8.9 1.8 1.9z" 
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"
        className="stroke-iconLight dark:stroke-iconDark"></path>
        <path d="M7.7 15.7H5.5c-.4 0-.7-.3-.7-.7v-2.3c0-.4.3-.7.7-.7h2.3c.4 0 
        .7.3.7.7V15c0 .4-.4.7-.8.7zM6.6 4.4V.8M17.4.8v3.6" 
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"
        className="stroke-iconLight dark:stroke-iconDark"></path>
      </svg>
    </button>
  ));
  return (
    <DatePicker showIcon showWeekNumbers
    maxDate={currentDate}
    closeOnScroll={(e) => e.target === document}
    customInput={<ExampleCustomInput />}
    renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }:any) => (
        <div
          style={{
            margin: 10,
            display: "flex",
            justifyContent: "center",
          }}
          className="child:bg-backgroundThirdLight child:dark:bg-backgroundThirdDark
          child:py-0.5 child:transition-colors child:cursor-pointer">
          <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled} aria-label="Previous month"
          className="rounded-l hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark">
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 border-r border-borderLight dark:border-borderDark">
              <path d="M20 25a1 1 0 0 1-.71-.29l-8-8a1 1 0 0 1 0-1.42l8-8a1 1 0 1 1 1.42 
              1.42L13.41 16l7.3 7.29a1 1 0 0 1 0 1.42A1 1 0 0 1 20 25Z"
              className="fill-textLight dark:fill-textDark"></path><path d="M0 0h32v32H0z" fill="none"></path>
            </svg>
          </button>
          <select value={currentDate.getFullYear()}
            onChange={({ target: { value } }) => changeYear(value)}
            className="hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark px-0.5"
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <select value={months[currentDate.getMonth()]}
            onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
            className="hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark px-0.5"
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button onClick={increaseMonth} disabled={nextMonthButtonDisabled} aria-label="Next month"
          className="rounded-r hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark">
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 border-l border-borderLight dark:border-borderDark">
              <path d="M12 25a1 1 0 0 1-.71-.29 1 1 0 0 1 0-1.42l7.3-7.29-7.3-7.29a1 1 0 1 1 
              1.42-1.42l8 8a1 1 0 0 1 0 1.42l-8 8A1 1 0 0 1 12 25Z" 
              className="fill-textLight dark:fill-textDark"></path><path d="M0 0h32v32H0z" fill="none"></path>
            </svg>
          </button>
        </div>
      )}
      selected={startDate}
      onChange={(date:any) => setStartDate(date)}
    />
  );
}
 
export default CustomDatePicker;