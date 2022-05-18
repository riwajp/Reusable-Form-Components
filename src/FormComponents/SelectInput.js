import {  useEffect,useMemo } from "react";
import Select from "react-select";

const SelectInput = ({
  name,
  options,
  dependency,
  placeholder,
  render,
  label,
  selected_values,
  setSelectedValues,
  
}) => {

  
  const dependency_value=useMemo(()=>{
  const temp_dependency_value=[];
  for(let i of dependency){
    temp_dependency_value.push(selected_values[i]);
  }

return temp_dependency_value
},[selected_values]
  )
  


  //filters empty or undefiend dependencies
  const dependency_value_filtered = dependency_value.filter(
    (v) => v && v.length
  );

  const self_value = selected_values[name];
 

  //to filter option============================================================

  let options_final = []; //options to be rendered

  if (!dependency_value_filtered.length) {
    // if all dependencies empty, all options will be rendered
    options_final = options;
  } else {
    let options_new = options;

    const lowest_dependency =
      dependency_value_filtered[dependency_value_filtered.length - 1];

    for (let j of lowest_dependency) {
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
      if(JSON.stringify(selected_values[name])!==JSON.stringify(new_values)){
      setSelectedValues({...selected_values,[name]:new_values});
      }
    }
  }, [dependency_value]);

  //return==================================================
  return render({
    Select,
    label,
    name,
    placeholder,
    options: options_final,
    isMulti: true,
    onChange: (val) =>  setSelectedValues({...selected_values,[name]:val}),
    value: self_value,
  });
};

export default SelectInput;
