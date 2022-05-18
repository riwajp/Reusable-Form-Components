import DateRangePicker from "./FormComponents/DateRangePicker";
import SelectForms from "./FormComponents/SelectForms";
import FaIcon from "./icons.js";



const FilterInput = 
    (
      {
        name,
        type,
        placeholder,
        label,
        default_value,
        options,
        controlled,
        setControlledFilters,
        setUncontrolledFilters,
        filters,
        ...field
      },
      
    ) => {
    
      let onChangeProp = {};
      if (controlled) {
        onChangeProp = {
          onChange: (value) => {
            setControlledFilters(
             
             value
            );
          },
         
        };
      }else{
        onChangeProp={
          onChange:(value)=>{
            setUncontrolledFilters(value);
          }
        }
      }
      switch (type) {

        case "multi-select":
         
          return(
            <SelectForms
            name={name}
            data={field.data}
            default_value={default_value}
          
            renderEach={({ Select, label, ...props }) => (
              <div className="mt-2">
                <div style={{ fontSize: "12" }}>{label}</div>
                <Select {...props} />
              </div>
            )}
            {...onChangeProp}
          />

          );
          break;
          case "date-range":
            const months=[
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
            return( <DateRangePicker
            default_value={default_value}
              name={name}
              {...onChangeProp}
              months={months}
            
              valueClassName="bg-yellow-400 text-white  outline-0 w-full text-center cursor-pointer"
              renderHead={({
                date,
                decreaseMonth,
                decreaseYear,
                increaseMonth,
                increaseYear,
              }) => (
                <div className="w-full flex h-4">
                  <div className=" w-1/6 flex">
                    <FaIcon
                      icon="angle-double-left"
                      className="text-xl cursor-pointer w-5"
                      onClick={() => {
                        decreaseYear();
                      }}
                    />
    
                    <FaIcon
                      icon="angle-left"
                      className="text-xl ml-3 cursor-pointer w-4"
                      onClick={() => decreaseMonth()}
                    />
                  </div>
                  <div className="px-0 w-4/6  mr-auto ml-auto">
                    <span className="font-bold text-base">
                      {months[date.getMonth()]}
                    </span>
                    <span className="ml-2 font-bold text-base">
                      {date.getFullYear()}
                    </span>
                  </div>
                  <div className="w-1/6 flex flex-row">
                    <FaIcon
                      icon="angle-right"
                      className="text-xl cursor-pointer w-4 "
                      onClick={() => increaseMonth()}
                    />
                    <FaIcon
                      icon="angle-double-right"
                      className="text-xl ml-3 cursor-pointer w-5"
                      onClick={() => {
                        increaseYear();
                      }}
                    />
                  </div>
                </div>
              )}
              renderDay={({
                day,
                date,
    
                selected_date,
                start_date,
                end_date,
                calendar_selected_month,
                setCalendarSelectedMonth,
              }) => {
                const tooltip_text = day;
    
                let class_name;
    
                if (
                  date.getDate() === selected_date.getDate() &&
                  date.getMonth() === selected_date.getMonth() &&
                  date.getFullYear() === selected_date.getFullYear()
                ) {
                  class_name = "bg-yellow-300 border-2 border-blue-400";
                } else if (date <= end_date && date >= start_date) {
                  class_name = "bg-yellow-300 ";
                } else if (date.getMonth() !== calendar_selected_month) {
                  class_name = "bg-slate-300 text-white";
                } else {
                  class_name = "bg-white hover:bg-yellow-300 text-black";
                }
                if (date.getMonth === calendar_selected_month) {
                  return (
                    <div title={tooltip_text} className={class_name}>
                      {date.getDate()}
                    </div>
                  );
                } else {
                  return (
                    <div
                      title={tooltip_text}
                      className={class_name}
                      onClick={() => {
                        setCalendarSelectedMonth(date.getMonth());
                      }}
                    >
                      {date.getDate()}
                    </div>
                  );
                }
              }}
              render={(DatePicker, start_picker, end_picker) => (
                <div className="flex items-center bg-yellow-400 w-80 h-7 rounded ml-1 mb-4 mt-8  text-white text-sm ">
                  <div>
                    <div className=" grid grid-cols-12  rounded px-2 place-content-center w-full ">
                      <div className="  flex place-content-center col-span-5">
                        <DatePicker {...start_picker} />
                      </div>
                      <div className=" font-bold col-span-2 text-center ">to</div>
                      <div className="  flex place-content-center col-span-5">
                        <DatePicker {...end_picker} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            />)
            break;
        
      }
    }
  
  
  export default FilterInput;