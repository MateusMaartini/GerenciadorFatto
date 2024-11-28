const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  addTask,
  editTask,
  deleteTask,
} = require("../controllers/taskController");

// Rota GET para listar as tarefas
router.get("/", getAllTasks);

// Rota POST para criar uma nova tarefa
router.post("/", addTask);

// Rota PUT para editar uma tarefa
router.put("/:id", editTask);

// Rota DELETE para excluir uma tarefa
router.delete("/:id", deleteTask);

module.exports = router;
