const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');
const app=express();

const port=8000;

const notesRoutes=require('./Routes/NotesRoutes');
// const socketIo = require('socket.io'); // Correct import for socket.io

require ('dotenv').config();
//Middleware
app.use(cors());
app.use(bodyParser.json());

//connect to mongoose
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("connected to MongoDB"))
.catch(err=>console.error("failed to connect to MongoDB",err));


//cors to connect to frontend
const corsOptions ={
    origin:'https://mini-notes.netlify.app/', 
    credentials:true,            
    optionSuccessStatus:200,
    allowedHeaders:['Authorization','Content-Type']
}
app.use(
    cors(corsOptions)
)

//routes
app.use('/notes',notesRoutes);


app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(), // server uptime in seconds
  });
});


//listen to port 
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// app.listen(port,()=>console.log(`Server Started : http://localhost:${port}/`))