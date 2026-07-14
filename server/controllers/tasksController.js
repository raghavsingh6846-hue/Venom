exports.getTasks = (req, res, db) => {

    res.json({
        success: true,
        tasks: db.data.tasks
    });

};
