import FilterInput from "./FilterInput"

import {useForm} from "react-hook-form";
import {useState} from "react";

const Form1=({default_values,form_schema})=>{
    const [filters,setFilters]= useState(default_values || {});
    console.log(filters);


    const {  handleSubmit, setValue } =
    useForm({
      mode: "onSubmit",
      defaultValues: default_values || {}
      ,
    });

    return(<div>
         <div>
        {form_schema.map(schema=><FilterInput {...schema} key={schema.name} setControlledFilters={(vals)=>setFilters({...filters,[schema.name]:vals})} setUncontrolledFilters={(vals)=>setValue(schema.name,vals)} default_value={default_values[schema.name]}/>)}
        <button onClick={handleSubmit((vals)=>console.log(vals))}>Submit</button>

        </div>
    </div>)
}

export default Form1;