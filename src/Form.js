import { createContext } from "react";
import SelectForms from "./SelectForms";
import regions from "./regions.json";
import { useForm } from "react-hook-form";

const FormContext = createContext();
const Forms = () => {
  //react-hook-form==========================
  const { register, handleSubmit, reset, control, setValue, getValues } =
    useForm({
      mode: "onSubmit",
    });

  //format data==========================
  const select_form_data = { province: [], district: [], local: [] };
  for (var code of Object.keys(regions)) {
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

  const data = [
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

  //return==========================
  return (
    <div>
      <FormContext.Provider
        value={{ register, handleSubmit, control, setValue, reset, getValues }}
      >
        <SelectForms
          data={data}
          form_context={FormContext}
          render={({ Select, label, ...props }) => (
            <div>
              <div style={{ fontSize: "12" }}>{label}</div>
              <Select {...props} />
            </div>
          )}
        />
        <button onClick={handleSubmit((data) => console.log(data))}>
          Submit
        </button>
      </FormContext.Provider>
    </div>
  );
};

export default Forms;
