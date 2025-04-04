// import dependencies and load environment variables
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session"); 
const app = express();
const PORT = process.env.PORT || 3000;

// database connection
const MONGODB_URI = process.env.DB_URI;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database!"));
//middlewares
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.use(
    session({
        secret: 'my secret key', 
        saveUninitialized: true, 
        resave: false,
    })
);

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});


app.use(express.static('uploads'));

//set template engine
app.set("view engine", "ejs");

// route prefix
app.use("", require("./routes/routes"));

// start server
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});


