import SelectInput from "./SelectInput";
import {useState, } from "react";
import { useEffect } from "react";

const SelectForms = ({ name, data,  renderEach,default_value,onChange }) => {
  const select_names = data.map((d) =>  d.name);
  const selected={};
  for (let i of select_names){
    selected[i]= default_value && default_value[i] ? default_value[i] :  [];
  }
  const [selected_values,setSelectedValues]=useState(selected);
  const lowest_values=()=>{
    let lowest_key;
    for(let i of select_names){
      if(selected_values[i] && selected_values[i].length){
        lowest_key=i;
      }
    }
    return(selected_values[lowest_key]);

  }


  
  useEffect(()=>{
    if(onChange){
      onChange(lowest_values()?.map(v=>v.value))
    }

  },[selected_values])
  return (
    <div>
      {data.map((d, i) => (
        <SelectInput
          key={i}
          label={d.label}
          name={d.name}
          options={d.options.map((o) => ({
            label: o.label,

            value: o.value,
          }))}
          dependency={select_names.slice(0, i)}
          render={renderEach}
          selected_values={selected_values}
          setSelectedValues={(val)=>setSelectedValues(val)}
        
        
          
        />
      ))}
    </div>
  );
};

export default SelectForms;
