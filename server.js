const path = require("path");

const express = require("express");
const cors = require("cors");

require("dotenv").config();
const port = process.env.PORT || 5000;
const connectDatabase = require("./config/db");

connectDatabase();

const app = express();

app.use(express.static(path.join(__dirname, "public")));


app.use(express.json());
app.use(express.urlencoded({ extended:false }));


app.use(cors({ origin: ["http://localhost:5000", "http://localhost:3000"], credentials: true }));


app.get("/", (request, response) => {

    response.send(console.log("welcome to the api"));

})


const ideaRouter = require("./routes/ideas");
app.use("/api/ideas", ideaRouter);


app.listen(port, () => {

    console.log("server is listening on port: " + port);

});



