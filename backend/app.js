require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { db } = require("./db/db");
const PORT = process.env.PORT;
const app = express();
const tradeRouter = require("./routes/trades");
const balanceRouter = require("./routes/balances");
const watchlistRouter = require("./routes/watchlists");
const userRouter = require("./routes/user");
const pricingRouter = require("./routes/priceModels");
const cookieParser = require("cookie-parser");

//middleware
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/trade", tradeRouter);
app.use("/api/balances", balanceRouter);
app.use("/api/watchlists", watchlistRouter);
app.use("/api/user", userRouter);
app.use("/api/price-models", pricingRouter);

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log("listening on port:", PORT);
  });
};

server();
