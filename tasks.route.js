const express = require("express");
const router = express.Router();
const { sequelize, Task } = require("../tasks");

//http://localhost:4000/toDoList

// creating
router.post("/", async (req, res) => {
  const list_id = req.params.list_id;
  const { list_id, description } = req.body;

  try {
    const task = await Task.create({ list_id, description });
    return res.json(task);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// getting data, all
router.get("/", async (req, res) => {
  try {
    const task = await Task.findAll();
    return res.json(task);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

// getting data, one
router.get("/:list_id", async (req, res) => {
  const list_id = req.params.list_id;
  try {
    const task = await Task.findOne({
      where: { id },
    });

    return res.json(task);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

// deleting
router.delete("/:list_id", async (req, res) => {
  const list_id = req.params.list_id;
  try {
    const task = await Task.findOne({ where: { id } });

    await task.destroy();

    return res.json({ message: "Task deleted!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

// updating
router.put("/:list_id", async (req, res) => {
  const list_id = req.params.list_id;
  const { list_id, description } = req.body;
  try {
    const task = await Task.findOne({ where: { id } });

    toDoList.id = list_id;
    task.id = id;
    task.description = description;

    await task.save();

    return res.json(task);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
