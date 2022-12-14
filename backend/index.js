const express = require("express");
const app = express();
const connectDatabase = require("./config/db");
const initRoutes = require("./routes/index");
require('dotenv').config()

//Connect database
connectDatabase();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//Routes
initRoutes(app)

app.listen(process.env.PORT, () => {console.log(`Server is working on http://localhost:${process.env.PORT}`);});
