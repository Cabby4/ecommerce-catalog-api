
const express = require("express");
const cors = require("cors");
const RequestLogger = require("./middlewares/logger");
const errorhandler = require("./middlewares/errorHandler");
const ProductRoutes = require('./routes/productRoute')

const app = express();




app.use(express.json());

app.use(cors('*'))

app.use(RequestLogger)

app.use('/api', ProductRoutes)


app.use(errorhandler)

module.exports = app