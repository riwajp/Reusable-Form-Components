import { createContext } from "react";
import SelectForms from "./SelectForms";
import regions from "./regions.json";
import { useForm } from "react-hook-form";

const FormContext = createContext();
const Forms = () => {
  //react-hook-form
  const { register, handleSubmit, reset, control, setValue, getValues } =
    useForm({
      mode: "onSubmit",
    });

  //format data
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

  return (
    <div>
      <FormContext.Provider
        value={{ register, handleSubmit, control, setValue, reset, getValues }}
      >
        {" "}
        <SelectForms
          data={[
            { name: "province", options: select_form_data.province },
            { name: "district", options: select_form_data.district },
            { name: "local", options: select_form_data.local },
          ]}
          form_context={FormContext}
          label={(label) => <div style={{ fontSize: "12" }}>{label}</div>}
        />
        <br />
        <br />
        <SelectForms
          data={[
            { name: "second_province", options: select_form_data.province },
            { name: "second_district", options: select_form_data.district },
            { name: "second_local", options: select_form_data.local },
          ]}
          form_context={FormContext}
        />
        <br />
        <button onClick={handleSubmit((data) => console.log(data))}>
          Submit
        </button>
      </FormContext.Provider>
    </div>
  );
};

export default Forms;
