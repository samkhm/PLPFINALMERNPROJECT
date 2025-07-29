require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./routes/regLogRoutes"));
app.use("/api/rooms", require("./routes/roomRoutes"));
app.use("/api/payment", require("./routes/paymentRoute"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>{
    console.log(`Server running at http://localhost:${PORT}`);
});