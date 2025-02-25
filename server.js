const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://samar0486:samar0486@allbackends.xm3hwao.mongodb.net/UserMoney", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Define Money Schema & Model
const MoneySchema = new mongoose.Schema({
    amount: Number,
});

const Money = mongoose.model("Money", MoneySchema);

// API Route to Save Money
app.post("/money", async (req, res) => {
    try {
        const { amount } = req.body;
        const money = new Money({ amount });
        await money.save();
        res.json({ success: true, money });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// API Route to Get Latest Money Value
app.get("/money", async (req, res) => {
    try {
        const latestMoney = await Money.findOne().sort({ _id: -1 }); // Get latest entry
        res.json({ success: true, latestMoney });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Start Server
app.listen(5200, () => {
    console.log("Server running on port 5200");
});
