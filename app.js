const express = require("express");
const { sequelize, ToDoList, Task } = require("./to-do-list", "./tasks");
const toDoListRoutes = require("./Routes/toDoList.route");
const taskRoutes = require("./Routes/tasks.route");
const app = express();

//http://localhost:4000/toDoList

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use("/toDoList", toDoListRoutes); // all To Do Lists
app.use("/toDoList/:list_id", toDoListRoutes); // one To Do List
app.use("/toDoList/:list_id/tasks", taskRoutes);
app.use("/toDoList/:list_id/tasks/tasks_id", taskRoutes);

app.listen({ port: 4000 }, async () => {
  console.log("Server up on http://localhost:4000");
  await sequelize.authenticate();
  console.log("Database Connected!");
});

// // creating
// app.post("/toDoList", async (req, res) => {
//   const id = req.params.id;
//   const { title, description } = req.body;

//   try {
//     const toDoList = await ToDoList.create({ id, title, description });
//     return res.json(toDoList);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json(err);
//   }
// });

// // getting data, all
// app.get("/toDoList", async (req, res) => {
//   try {
//     const toDoList = ToDoList.findAll();
//     return res.json(toDoList);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: "Something went wrong" });
//   }
// });

// // getting data, one
// app.get("/toDoList/:id", async (req, res) => {
//   const id = req.params.id;
//   try {
//     const toDoList = await ToDoList.findOne({
//       where: { id },
//     });

//     return res.json(user);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: "Something went wrong" });
//   }
// });

// // deleting
// app.delete("/toDoList/:id", async (req, res) => {
//   const id = req.params.id;
//   try {
//     const toDoList = await ToDoList.findOne({ where: { id } });

//     await toDoList.destroy();

//     return res.json({ message: "To Do List deleted!" });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: "Something went wrong" });
//   }
// });

// // updating
// app.put("/toDoList/:id", async (req, res) => {
//   const id = req.params.id;
//   const { title, description } = req.body;
//   try {
//     const toDoList = await ToDoList.findOne({ where: { id } });

//     toDoList.id = id;
//     toDoList.title = title;
//     toDoList.description = description;

//     await toDoList.save();

//     return res.json(user);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: "Something went wrong" });
//   }
// });

// app.listen({ port: 4000 }, async () => {
//   console.log("Server up on http://localhost:4000");
//   await sequelize.authenticate();
//   console.log("Database Connected!");
// });
