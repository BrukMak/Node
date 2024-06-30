import axios from "axios";  
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useState } from "react";

export const RQtasksPage = () => {
    const queryClient = useQueryClient(); 
    const [editMode, setEditMode] = useState({});
    const [editedTask, setEditedTask] = useState({});

    // Fetch taks from the backend
    const {loading, data: tasks, error} = useQuery("tasks", () => {
      return axios.get("http://localhost:8000/api/todos")
        .then((response) => response.data);
    });
    // delete task
    const deleteTask = useMutation((taskId) => {
        return axios.delete(`http://localhost:8000/api/todos/${taskId}`);
      }, {
        onSuccess: () => {
          queryClient.invalidateQueries("tasks");
          alert("Task deleted successfully");
          
        },
        onError: 
        (error) => {
          console.error('Error deleting task:', error.response?.data || error.message);
          alert('Error deleting task: ' + (error.response?.data?.error || error.message));
        }
      });

    // delete handler  
      const deleteHandler = (taskId) => {
        deleteTask.mutate(taskId);
        
      };

      const updateTask = useMutation((updatedTask) => {
        return axios.put(`http://localhost:8000/api/todos/${updatedTask._id}`, updatedTask); 
      },{
        onSuccess: () => {
          queryClient.invalidateQueries("tasks");
          setEditMode({});
          setEditedTask({});
          alert("Task updated successfully");
        },
        onError:
        (error) => {
          console.error('Error updating task:', error.response?.data || error.message);
          alert('Error updating task: ' + (error.response?.data?.error || error.message));
        }
      });

      // Edit mode handler
      const handleEdit = (task) => {
        setEditMode({[task._id]: true});
        setEditedTask(task);
      }

      // Save handler
      const handleSave = () => {
        updateTask.mutate(editedTask);
      }

      // change handler
      const handleChange = (e) => {
        const {name, value} = e.target;
        setEditedTask((prev)=>({
          ...prev,
          [name]: value
        })
         );
      }

      


    if (loading) return (<div>Loading...</div>);
    if (error) return <div>Error: {error.message}</div>;

    

    return (
      <>
      <h2>TasksPage React-query</h2>
      {tasks && tasks.map((task) => (
        <div key={task._id}>
          {editMode[task._id] ? (
            <div>
              <input
                type="text"
                name="title"
                value={editedTask.title}
                onChange={handleChange}
              />
              <input
                type="text"
                name="description"
                value={editedTask.description}
                onChange={handleChange}
              />
              <button onClick={() => handleSave(task._id)}>Save</button>
              <button onClick={() => setEditMode({ [task._id]: false })}>Cancel</button>
            </div>
          ) : (
            <div>
              <ul>
                <li><h3>{task.title}</h3></li>
                <p>{task.description}</p>
              </ul>
              <button onClick={() => handleEdit(task)}>Edit</button>
              <button onClick={() => deleteHandler(task._id)} type="submit">Delete</button>
            </div>
          )}
        </div>
      ))}
    </>

    )
  }
  