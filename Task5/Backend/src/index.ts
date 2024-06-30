import express , { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import TodoRoute from "../Routes/todo.route";
import cors from "cors"; 


// Load environment variables from .env file
dotenv.config();



const app = express();


// app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());


//Routes
app.use('/api/todos', TodoRoute);

const port = process.env.PORT || 0; // Change the port number to 0 to get a random port number

console.log(`Port is: ${port}`); // Add this line to check the port number

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});
// Getting the connection string from .env file
let dbURI: string;
dbURI = process.env.MONGODB_URI || "";
// console.log(dbURI);

// const options: any = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// };

mongoose.connect(dbURI)
  .then(() => {
    console.log("Connected to database.");
    app.listen(port, () => {
      console.log(`The server is running at http://localhost:${port}`);
    });
  })
  .catch(() => {
    console.log("Connection Failed");
  });
