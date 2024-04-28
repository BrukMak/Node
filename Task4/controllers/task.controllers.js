const {
  getAllProducts,
} = require("../../simple-crud-app/controllers/products.controller");
const Task = require("../model/tasks.model");

const addTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTaskByID = async (req, res) => {
    try{
        const { id } = req.params;
        const task = await Task.findById(id);
        res.status(200).json(task);
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndUpdate(id);
        if (!task){
            res.status(404).json("Task not found")
        }
        
        const updatedTask = await Task.findById(id);
        res.status(200).json(updatedTask)
        

    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
}

const deleteTask = async (req, res) => {
    try {
        const {id} = req.params;
        const task = await Task.findByIdAndDelete(id);
        if (!task){
            return res.status(404).json({message: "Task not found"})
        }
        res.status(200).json({message: "Task deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
  addTask,
  getAllTasks,
  getTaskByID,
  updateTask,
  deleteTask
};
