require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { db } = require("./db/db");
const PORT = process.env.PORT;
const app = express();
const tradeRouter = require("./routes/trades");
const balanceRouter = require("./routes/balances");
const watchlistRouter = require("./routes/watchlists");
const bodyParser = require("body-parser");

//middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

//routes
app.use("/api/trade", tradeRouter);
app.use("/api/balances", balanceRouter);
app.use("/api/watchlists", watchlistRouter);

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log("listening on port:", PORT);
  });
};

server();
