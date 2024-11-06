import Task from '../database/model/task.model.js';

class TaskController {

  renderNewForm(req, res) {
    res.render("taskform", { isUpdate: false, task: null, title: "Nova Tarefa" });
  }
  

  async renderEditForm(req, res) {
    const id = req.params.id;
    const task = await Task.findByPk(id);
    if (task) {
        res.render("taskform", { isUpdate: true, task, title: "Editar Tarefa" });
    } else {
        res.status(404).send("Tarefa não encontrada");
    }
}


  async createTask(req, res) {
    const name = req.body.name;
    const description = req.body.description;
    const isFinished = req.body.isFinished ? true : false;

    await Task.create({ name, description, isFinished });

    res.redirect("/tasks");
  }

  async updateTask(req, res) {
    const id = req.body.id;
    const name = req.body.name;
    const description = req.body.description;
    const isFinished = req.body.isFinished ? true : false;

    await Task.update({ name, description, isFinished }, { where: { id } });

    res.redirect("/tasks");
  }

  async listTasks(req, res) {
    const tasks = await Task.findAll();
    res.render("tasklist", { tasks, title: "Lista de Tarefas" });
  }

  async deleteTask(req, res) {
    const id = req.params.id;
    await Task.destroy({ where: { id } });
    res.redirect("/tasks");
  }
}


export default TaskController;
