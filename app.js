const express = require("express");
const mongoose = require('mongoose');

const app = express();
// connection to mongodb
mongoose.connect("mongodb://127.0.0.1/todo_app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// middleware
app.use(express.urlencoded({ extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

// routes
app.use(require("./routes/index"));
app.use(require("./routes/todo"));






// server configurations

app.listen(3000, () => console.log("Server listening on port 3000") )

