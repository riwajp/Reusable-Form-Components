import "./style.css";

import SideBar from "./SideBar";
import Form from "./Form";
import { useEffect, useState } from "react";
import StoryItem from "./StoryItem";
import form_schema from "./form_schema.json";
import filter_schema from "./filter_schema.json";
import {filter} from "./utils";



export default function App() {
  const [stories, setStories] = useState();
  const [filters,setFilters]=useState();
  const [filtered_stories,setFilteredStories]=useState();
console.log(filters);
const default_form_values={
  date:{start: new Date(new Date().setDate(new Date().getDate() - 7)),end: new Date()},
 
}

  const apiUrl =
    "http://172.105.42.112:5000/api/sthiti/78dbc6ca-93a9-4f8b-abca-20b4e647e890/";

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((res) => {
        setStories({ full_stories: res.hits.hits });
        setFilteredStories(res.hits.hits)
       
      });
  }, []);

  useEffect(()=>{

    if(filtered_stories){
    let temp_filtered_stories=stories.full_stories;
    for(let schema of filter_schema){
      
      temp_filtered_stories=filter(temp_filtered_stories,schema.key,schema.type,filters[schema.value] )


    }
    console.log(temp_filtered_stories)
    setFilteredStories(temp_filtered_stories )
    
  }


  },[filters])
  return (
    <div className="flex">
      <div className="basis-9/12">Map Here</div>
      <div className="basis-3/12 border-l-4 border-yellow-200">
        <SideBar
          render={() => (
            <div>
              <Form form_schema={form_schema} default_values={default_form_values} stories={stories} handleFormSubmit={(values)=>setFilters(values)}/>            
              { filtered_stories ? filtered_stories.map((d) => (
                <StoryItem key={d._id} data={d} />
              )) : "Loading..."}
            </div>
          )}
        />
      </div>
    </div>
  );
}
