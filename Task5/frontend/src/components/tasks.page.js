import { useState, useEffect } from "react";
import axios from "axios";



export const TasksPage = () => {
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/todos")
            .then((response) => {
                setTasks(response.data);
                setLoading(false);
            });
    }, []);
    if (loading) return (<div>Loading...</div>);  

    return (
      <div>
        
        <h2> TasksPage Traditional </h2> 
        {tasks.map((task) => (
            <ul key={task.id}>
              <li>  <h3>{task.title}</h3> </li>
              <p>{task.description}</p> 
            
          </ul>
        ))}

      </div>
      
)
} 