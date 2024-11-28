const Task = require("../models/Task");

// Função para listar todas as tarefas
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ ordemApresentacao: 1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar as tarefas." });
  }
};

// Função para adicionar uma nova tarefa
const addTask = async (req, res) => {
  const { nome, custo, data_limite, ordemApresentacao } = req.body;

  if (!nome || !custo || !data_limite || !ordemApresentacao) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  try {
    // Verifica se já existe uma tarefa com o mesmo nome
    const taskExists = await Task.findOne({ nome });
    if (taskExists) {
      return res
        .status(400)
        .json({ error: "Já existe uma tarefa com esse nome." });
    }

    const newTask = new Task({ nome, custo, data_limite, ordemApresentacao });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Erro ao salvar a tarefa." });
  }
};

// Função para editar uma tarefa
const editTask = async (req, res) => {
  const { nome, custo, data_limite, ordemApresentacao } = req.body;

  if (!nome || !custo || !data_limite || !ordemApresentacao) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  try {
    const taskExists = await Task.findOne({ nome });
    if (taskExists && taskExists._id.toString() !== req.params.id) {
      return res
        .status(400)
        .json({ error: "Já existe uma tarefa com esse nome." });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { nome, custo, data_limite, ordemApresentacao },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Tarefa não encontrada." });
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar a tarefa." });
  }
};

// Função para excluir uma tarefa
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Tarefa não encontrada." });
    }
    res.json({ message: "Tarefa excluída com sucesso." });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir a tarefa." });
  }
};

module.exports = { getAllTasks, addTask, editTask, deleteTask };
