const express = require("express");

const cookieParser = require("cookie-parser");

const app = express();
const errorMiddleware = require("./middlewares/errors");
app.use(express.json());
app.use(cookieParser());

// Import all routes
const products = require("./routes/product");
const auth = require("./routes/auth");

app.use("/api/v1/products", products);
app.use("/api/v1", auth);

// midddeware to handle errors
app.use(errorMiddleware);

module.exports = app;
