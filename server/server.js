const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/wallet", require("./routes/wallet"));
app.use("/tasks", require("./routes/tasks"));
app.use("/campaign", require("./routes/campaign"));
app.use("/leaderboard", require("./routes/leaderboard"));

app.get("/", (req, res) => {
    res.json({
        app: "Venom",
        status: "Running"
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Venom Server Running http://localhost:${PORT}`);
});
