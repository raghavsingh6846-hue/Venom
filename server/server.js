const express = require("express");
const { JSONFilePreset } = require("lowdb/node");

const app = express();
const PORT = 3000;

app.use(express.json());

let db;

async function start() {

    db = await JSONFilePreset("db.json", {
        users: [],
        tasks: []
    });

    app.get("/", (req, res) => {
        res.json({
            app: "Venom",
            version: "1.0",
            status: "Running"
        });
    });

    app.post("/signup", async (req, res) => {

        const { username, password } = req.body;

        const exists = db.data.users.find(
            u => u.username === username
        );

        if (exists) {
            return res.json({
                success: false,
                message: "Username already exists"
            });
        }

        db.data.users.push({
            username,
            password,
            coins: 100,
            completedTasks: []
        });

        await db.write();

        res.json({
            success: true,
            message: "Account Created",
            coins: 100
        });

    });

    app.post("/login", (req, res) => {

        const { username, password } = req.body;

        const user = db.data.users.find(
            u => u.username === username &&
            u.password === password
        );

        if (!user) {
            return res.json({
                success: false,
                message: "Invalid Username or Password"
            });
        }

        res.json({
            success: true,
            username: user.username,
            coins: user.coins
        });

    });

    app.post("/wallet", (req, res) => {

        const { username } = req.body;

        const user = db.data.users.find(
            u => u.username === username
        );

        if (!user) {
            return res.json({
                success: false,
                message: "User Not Found"
            });
        }

        res.json({
            success: true,
            username: user.username,
            coins: user.coins
        });

    });

    app.get("/tasks", (req, res) => {

        res.json({
            success: true,
            tasks: db.data.tasks
        });

    });

    app.post("/complete-task", async (req, res) => {

        const { username, taskId } = req.body;

        const user = db.data.users.find(
            u => u.username === username
        );

        if (!user) {
            return res.json({
                success: false,
                message: "User Not Found"
            });
        }

        const task = db.data.tasks.find(
            t => t.id == taskId
        );

        if (!task) {
            return res.json({
                success: false,
                message: "Task Not Found"
            });
        }

        if (user.completedTasks.includes(taskId)) {
            return res.json({
                success: false,
                message: "Task Already Completed"
            });
        }

        user.completedTasks.push(taskId);
        user.coins += task.reward;

        await db.write();

        res.json({
            success: true,
            reward: task.reward,
            totalCoins: user.coins
        });

    });

    app.listen(PORT, () => {
        console.log("🔥 Venom Server Running on Port 3000");
    });

}

start();
