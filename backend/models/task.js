const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  nome: { type: String, required: true, unique: true }, // Nome da tarefa
  custo: { type: Number, required: true }, // Custo da tarefa
  data_limite: { type: String, required: true }, // Data limite
  ordemApresentacao: { type: Number, required: true, unique: true }, // Ordem de apresentação
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
