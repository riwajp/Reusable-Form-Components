import { createContext, useMemo } from "react";
import SelectForms from "./SelectForms";
import regions from "./regions.json";
import { useForm } from "react-hook-form";
import DateRangePicker from "./DateRangePicker";
import FaIcon from "./icons.js";

const FormContext = createContext();
const Forms = () => {
  //react-hook-form==========================
  const { register, handleSubmit, reset, control, setValue, getValues } =
    useForm({
      mode: "onSubmit",
      defaultValues: {
        location1: {
          province: [{ label: "Madhesh", value: "2" }],
          district: [],
          local: [],
        },
        date1: {
          start: new Date(new Date().setDate(new Date().getDate() - 7)),
          end: new Date(),
        },
      },
    });

  //select-form=======================================
  const data = useMemo(() => {
    const select_form_data = { province: [], district: [], local: [] };
    for (let code of Object.keys(regions)) {
      let level;
      if (code.length === 1) {
        level = "province";
      } else if (code.length === 3) {
        level = "district";
      } else {
        level = "local";
      }

      select_form_data[level].push({
        label: regions[code].name,
        value: code,
      });
    }

    return [
      {
        label: "Province",
        name: "province",
        options: select_form_data.province,
      },
      {
        label: "District",
        name: "district",
        options: select_form_data.district,
      },
      { label: "Local", name: "local", options: select_form_data.local },
    ];
  });

  //date form=======================================
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

  //return==========================
  return (
    <div>
      <FormContext.Provider
        value={{ register, handleSubmit, control, setValue, reset, getValues }}
      >
        <DateRangePicker
          name="date1"
          months={months}
          form_context={FormContext}
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
        />

        <div className="ml-1">
          <SelectForms
            name="location1"
            data={data}
            form_context={FormContext}
            renderEach={({ Select, label, ...props }) => (
              <div className="mt-2">
                <div style={{ fontSize: "12" }}>{label}</div>
                <Select {...props} />
              </div>
            )}
          />
        </div>
        <button
          className="bg-yellow-200 px-2 py-1 mt-2 rounded"
          onClick={handleSubmit((data) => console.log(data))}
        >
          Submit
        </button>
      </FormContext.Provider>
    </div>
  );
};

export default Forms;
