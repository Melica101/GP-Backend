const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");
const app = express();


//const { API_PORT } = process.env;
//const port = process.env.PORT || API_PORT;
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDb connected");
});

var cors = require('cors');
app.use(cors());

app.use(express.json())
const userRoute = require("./routes/userroute");
const reviewsRoute = require("./routes/reviewsroute");
const parkinglotRoute = require("./routes/parkinglotroute");


app.use("/userroute", userRoute);
app.use("/reviewsroute",reviewsRoute );
app.use("/parkinglotroute",parkinglotRoute);
app.route("/").get((req, res) => res.json("hello world"));
app.listen(3000, 'localhost', ()=> console.log('listening on port'))