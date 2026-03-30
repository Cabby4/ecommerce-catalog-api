require ("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB =require("./database/db");
const LogIn = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const app = express();

connectDB();

app.use (express.json());
app.use (cors());
app.use (LogIn);


app.use (errorHandler);

const PORT = process.env.PORT || 3000;
app.listen (PORT, () => console.log('App is listening {PORT}'));