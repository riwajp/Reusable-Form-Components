import { useWatch } from "react-hook-form";
import { useContext, useEffect } from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";

const SelectInput = ({
  label,
  labelRender,
  name,
  options,
  dependency,
  placeholder,
  form_context,
}) => {
  const { control, setValue } = useContext(form_context);

  const dependency_value = useWatch({ control, name: dependency || "" });

  //filters empty or undefiend dependencies
  const dependency_value_filtered = dependency_value.filter(
    (v) => v && v.length
  );
  const self_value = useWatch({ control, name: name }) || [];

  //to filter option============================================================

  let options_final = []; //options to be rendered

  if (!dependency_value_filtered.length) {
    // if all dependencies empty, all options will be rendered
    options_final = options;
  } else {
    let options_new = options;

    const lowest_dependency =
      dependency_value_filtered[dependency_value_filtered.length - 1];

    for (var j of lowest_dependency) {
      const options_temp = options_new.filter((o) =>
        o.value.startsWith(j.value)
      );

      options_final.push(...options_temp);
      options_new = options_new.filter((o) => !options_temp.includes(o)); // removes the options already pushed to options_final
    }
  }

  //to filter values : ==================================================
  useEffect(() => {
    if (self_value.length > 0) {
      // remove the selected values which are not present in new options_final
      const options_list = options_final.map((o) => o.value);
      const new_values = self_value.filter((v) =>
        options_list.includes(v.value)
      );

      setValue(name, new_values);
    }
  }, [dependency_value]);

  //return==================================================
  return (
    <div>
      <div>{label}</div>
      <Controller
        control={control}
        name={name}
        render={() => (
          <Select
            name={name}
            placeholder={placeholder}
            style={{ width: "100%" }}
            options={options_final}
            isMulti
            onChange={(val) => setValue(name, val)}
            value={self_value}
          />
        )}
      />
    </div>
  );
};

export default SelectInput;
