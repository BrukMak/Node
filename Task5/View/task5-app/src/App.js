import React, { useState } from 'react';

function App() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/todos');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    }
  };

  const submitData = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const title = formData.get('title');
    const description = formData.get('description');
    try {
      const response = await fetch('http://localhost:8000/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setData(data);
      alert('Data submitted successfully');
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    }  
  }

  return (
    <div className="App">
      <h1>Task 5</h1>
      <h2>Fetch data from the back end api</h2>
      <p>Click the button to fetch data from the back end api</p>
      <button onClick={fetchData}>Fetch Data</button>

      <h2>Display the data</h2>
      <p>Display the data fetched from the back end api</p>
      <div>
      {data && (
        <div>
          <h3>Data Fetched:</h3>
          <ul>
            {data.map((item, index) => (
              <li key={index}>{JSON.stringify(item)}</li>
            ))}
          </ul>
        </div>

        
      )}
      <form>
          <label>
            Title:
            <input type="text" name="title" />
          </label>
          <label>
            Description:
            <input type="text" name="description" />
          </label>
          <button type="submit">Submit</button>
        </form>    

      </div>
    </div>
  );
}

export default App;