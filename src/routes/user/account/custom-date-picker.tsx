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
    <button className="rounded-md py-1 px-4
    border border-borderLight dark:border-borderDark" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));
  return (
    <DatePicker showIcon 
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
        >
          <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
            {"<"}
          </button>
          <select className="bg-backgroundThirdLight dark:bg-backgroundThirdDark"
            value={currentDate.getFullYear()}
            onChange={({ target: { value } }) => changeYear(value)}
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select className="bg-backgroundThirdLight dark:bg-backgroundThirdDark"
            value={months[currentDate.getMonth()]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
            {">"}
          </button>
        </div>
      )}
      selected={startDate}
      onChange={(date:any) => setStartDate(date)}
    />
  );
}
 
export default CustomDatePicker;