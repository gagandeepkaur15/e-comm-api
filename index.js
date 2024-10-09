const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");

const db = require("./config/mongoose-connection");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// To serve static files such as HTML, CSS, JavaScript, images, and other assets from the "public" directory to the client
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res)=>{
    res.send("Hey");
});

app.use("/owners", ownersRouter);
app.use("/ousers", usersRouter);
app.use("/products", productsRouter);

app.listen(3000);