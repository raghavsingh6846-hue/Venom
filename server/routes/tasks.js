const express = require("express");

const router = express.Router();

const {
    getTasks
} = require("../controllers/tasksController");

module.exports = (db) => {

    router.get("/", (req, res) => {
        getTasks(req, res, db);
    });

    return router;

};
