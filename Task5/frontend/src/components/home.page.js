import axios from "axios";
import { useMutation, useQueryClient  } from "react-query";


export const HomePage = () => {
    const queryClient = useQueryClient();
    const addTask = useMutation((newTask) =>
        axios.post('http://localhost:8000/api/todos', newTask), {
          onSuccess: () => {
            queryClient.invalidateQueries('tasks');
            alert('Task added successfully');
            // reset form
            document.querySelector('form').reset();
          },
          onError: (error) => {
            console.error('Error adding task:', error.response?.data || error.message);
            alert('Error adding task: ' + (error.response?.data?.error || error.message));
          }
        });

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = event.target;
        const newTask = {
            title: formData.title.value,
            description: formData.description.value,
        };

        addTask.mutate(newTask);
    };

  return (
    <>
        <h1>HomePage</h1>
        <form onSubmit={handleSubmit}>
            <label>Task Title:</label>
            <input type="text" name="title" required/><br/>
            <label>Description:</label>
            <input type="text" name="description" required /><br/>
            <button type="submit" disabled={addTask.isLoading}>
                {addTask.isLoading ? "Adding task..." : "Add" } 
                </button>
        </form>
    </>

  )
}
