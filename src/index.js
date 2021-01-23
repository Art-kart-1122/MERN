const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config/dev");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
// don`t forget to set body parser limit
app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "/images")));
//Middlewares


//Routes
app.use("/auth", require("./routes/auth"));
app.use("/card", require("./routes/card"));

const PORT = config.port || 3500;

async function start() {
    try {
        const connectURL = config.MONGO_DB_CONNECT_URI;
        await mongoose.connect(connectURL, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
}

start();