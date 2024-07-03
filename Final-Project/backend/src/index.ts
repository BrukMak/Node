
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import StudentRoute from "../routes/student.routes";
import cors from "cors";

// Load environment variables from .env file
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/students', StudentRoute);


// port from environment variable or default to 80
const port = process.env.PORT || 0;


app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Getting the connection string from .env file
let dbURI: string;
dbURI = process.env.MONGODB_URI || "";

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
