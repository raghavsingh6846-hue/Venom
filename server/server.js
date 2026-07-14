const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/auth"));

app.get("/", (req, res) => {
    res.json({
        app: "Venom",
        status: "Running"
    });
});

app.listen(3000, () => {
    console.log("Venom Server Running http://localhost:3000");
});
