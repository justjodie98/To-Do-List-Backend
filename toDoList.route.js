const express = require("express");
const router = express.Router();
const { sequelize, ToDoList } = require("../to-do-list");

//http://localhost:4000/toDoList

// creating
router.post("/", async (req, res) => {
  const list_id = req.params.list_id;
  const { list_id, title } = req.body;

  try {
    const toDoList = await ToDoList.create({ list_id, title });
    return res.json(toDoList);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// getting data, all
router.get("/", async (req, res) => {
  try {
    const toDoList = await ToDoList.findAll();
    return res.json(toDoList);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

// getting data, one
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const toDoList = await ToDoList.findOne({
      where: { id },
    });

    return res.json(toDoList);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

// deleting
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const toDoList = await ToDoList.findOne({ where: { id } });

    await toDoList.destroy();

    return res.json({ message: "To Do List deleted!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

// updating
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { title } = req.body;
  try {
    const toDoList = await ToDoList.findOne({ where: { id } });

    toDoList.id = id;
    toDoList.title = title;

    await toDoList.save();

    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
