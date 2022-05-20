import FilterInput from "./FilterInput"

import {useForm} from "react-hook-form";
import {useState,useEffect} from "react";


const Form1=({default_values,form_schema,handleFormSubmit})=>{
    const [filters,setFilters]= useState(default_values || {});

  useEffect(()=>{
    if(form_schema.controlled){
      handleFormSubmit(filters);

    }
  },[filters])


    const {  handleSubmit, setValue } =
    useForm({
      mode: "onSubmit",
      defaultValues: default_values || {}
      ,
    });


    //console.log(filter(stories?.full_stories.hits.hits,"_source.indexed_at","within-date",filters?.date)?.map(d=>d._source.indexed_at));
    //console.log(filter(stories?.full_stories.hits.hits,"_source.locations.primary.code","starts-with-multiple",filters?.location)?.map(d=>d._source.locations.primary.code));

    //console.log(filter(stories?.full_stories.hits.hits,"_source.locations.primary.code","starts-with-multiple",filters?.location));


    const handleChange=(vals,input_schema,controlled)=>{
      if(controlled){
        setFilters({...filters,[input_schema.name]:vals});
        setValue(input_schema.name,vals)

      
    }else{
        setValue(input_schema.name,vals)

      }

    }


    return(<div>
         <div>
        {form_schema.inputs.map(input_schema=><FilterInput {...input_schema} key={input_schema.name} onChange={(vals)=>handleChange(vals,input_schema,form_schema.controlled)} default_value={default_values[input_schema.name]}/>)}
       { !form_schema.controlled && <button onClick={handleSubmit((vals)=>handleFormSubmit(vals))}>Submit</button>}

        </div>
    </div>)
}

export default Form1;