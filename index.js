const mongoose = require("mongoose");
require("dotenv").config();

const express = require("express");
const app = express();
const genres = require("./routes/genres");
const customers = require('./routes/customers')

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.use(express.json());

app.use("/api/genres", genres);
// Anywhere you see 'api/customers' it should match it up to the customers module loaded above.
app.use('/api/customers', customers)

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
