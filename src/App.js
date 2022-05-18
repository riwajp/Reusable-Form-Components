import "./style.css";

import SideBar from "./SideBar";
import Form from "./Form";
import { useEffect, useState } from "react";
import StoryItem from "./StoryItem";
import form_schema from "./form_schema.json";


export default function App() {
  const [stories, setStories] = useState();

const default_form_values={
  date:{start: new Date(new Date().setDate(new Date().getDate() - 7)),end: new Date()},
  location:{province:[{label:"Madhesh", value:"2"}]}

}

  const apiUrl =
    "http://172.105.42.112:5000/api/sthiti/78dbc6ca-93a9-4f8b-abca-20b4e647e890/";

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((res) => {
        setStories({ full_stories: res });
      });
  }, []);

  return (
    <div className="flex">
      <div className="basis-9/12">Map Here</div>
      <div className="basis-3/12 border-l-4 border-yellow-200">
        <SideBar
          render={() => (
            <div>
              <Form form_schema={form_schema} default_values={default_form_values}/>
            
              { stories && stories.full_stories.hits.hits.map((d) => (
                <StoryItem key={d._id} data={d} />
              ))}
            </div>
          )}
        />
      </div>
    </div>
  );
}
