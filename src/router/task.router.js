import express from "express";

import TaskController from "../controller/task.controller.js";
import Task from "../database/model/task.model.js";

const router = new express.Router();
const taskController = new TaskController()

router.get("/tasks", taskController.listTasks);

router.get("/tasks/new", taskController.renderNewForm);

router.get("/tasks/:id/update", taskController.renderEditForm);

router.get('/tasks/:id/delete', async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByPk(id); 
        if (task) {
            res.render('taskdelete', { id: task.id, taskName: task.name, title: "Excluir Tarefa" });
        } else {
            res.status(404).send("Tarefa não encontrada");
        }
    } catch (error) {
        console.error("Erro ao buscar tarefa:", error);
        res.status(500).send("Erro ao buscar tarefa");
    }
});


router.post("/tasks/new", taskController.createTask);

router.post("/tasks/:id/update", taskController.updateTask);

router.post("/tasks/:id/delete", taskController.deleteTask);


export default router;