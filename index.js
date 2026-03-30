require ('dotenv').config();


const express = require("express");
const cors = require("cors");
const errorHandler = require ("./middlewares/errorHandler");
const RequestLogger = require ("./middlewares/logger");
const ProductRoutes = require ("./routes/productRoute");
const connectDB =require ("./database/db")

const app = express();
connectDB();


app.use(express.json());

app.use(cors('*'))

app.use(RequestLogger)

app.use('/api', ProductRoutes)

app.use (errorHandler)

const PORT = process.env.PORT || 3000;

app.listen (PORT, () => {
    console.log(`App is listening on Port: ${PORT}`)
});