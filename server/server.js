const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth");
const walletRoutes = require("./routes/wallet");
const taskRoutes = require("./routes/tasks");
const campaignRoutes = require("./routes/campaign");
const leaderboardRoutes = require("./routes/leaderboard");
const proofRoutes = require("./routes/proof");
const adminRoutes = require("./routes/admin");
const coinsRoutes = require("./routes/coins");
const ordersRoutes = require("./routes/orders");

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

app.use("/auth", authRoutes);
app.use("/wallet", walletRoutes);
app.use("/tasks", taskRoutes);
app.use("/campaign", campaignRoutes);
app.use("/leaderboard", leaderboardRoutes);
app.use("/proof", proofRoutes);
app.use("/admin", adminRoutes);
app.use("/coins", coinsRoutes);
app.use("/orders", ordersRoutes);

app.get("/", (req, res) => {
  res.json({
    app: "Venom",
    version: "4.0",
    status: "Running"
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(
    `Venom Server Running http://localhost:${PORT}`
  );
});
