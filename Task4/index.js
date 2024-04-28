const express = require("express");
const mongoose = require("mongoose");
const Task = require("./model/tasks.model")
const app = express();
const TaskRoute = require("./routes/task.route");

// Middleware
app.use(express.json());


//Routes
app.use('/api/task', TaskRoute);



app.get("/", function (req, res) {
    res.send("Hello World");
  });

  mongoose
  .connect(
    // Task-API is the collection name
    "mongodb+srv://brukmakeni:dqip0npzMUc1xszh@taskmanagercluster.hkajnkq.mongodb.net/Task-API?retryWrites=true&w=majority&appName=TaskManagerCluster"
  )
  .then(() => {
    console.log("Connected to database.");
    app.listen(8000, () => {
      console.log("The server is running.");
    });
  })
  .catch(() => {
    console.log("Connection Failed");
  });



// //   add a task
// app.post('/api/task', async (req, res) => {
//     // console.log(req.body)
//     // res.send(req.body)
//     try{
//         const task = await Task.create(req.body);
//         res.status(200).json(task);
//     }catch(error){
//         res.status(500).json({message: error.message});
//     }
// })

// // get all tasks 
// app.get('/api/tasks', async(req, res) => {
//     try {
//         const tasks = await Task.find({});
//         res.status(200).json(tasks)
//     } catch (error) {
//         res.status(500).json({message: error.message})
        
//     }
// })

// // Get a single task bt ID
// app.get('/api/task/:id', async (req, res) => {
//     try{
//         const { id } = req.params;
//         const task = await Task.findById(id);
//         res.status(200).json(task);
//     }catch(error){
//         res.status(500).json({message: error.message})
//     }
// })

// // update task
// app.put('/api/task/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const task = await Task.findByIdAndUpdate(id);
//         if (!task){
//             res.status(404).json("Task not found")
//         }
        
//         const updatedTask = await Task.findById(id);
//         res.status(200).json(updatedTask)
        

//     } catch (error) {
//         res.status(500).json({message: error.message})
        
//     }
// })

// // delete task api
// app.delete('/api/task/:id', async (req, res) => {
//     try {
//         const {id} = req.params;
//         const task = await Task.findByIdAndDelete(id);
//         if (!task){
//             return res.status(404).json({message: "Task not found"})
//         }
//         res.status(200).json({message: "Task deleted successfully"});
//     } catch (error) {
//         res.status(500).json({message: error.message})
//     }
// })