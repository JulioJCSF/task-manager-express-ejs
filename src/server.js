import express from "express";
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));

//Lista de Tarefas 
let tasks = [
  { id: 1, name: "Tarefa 1", description: "Descrição da Tarefa 1", completed: false },
  { id: 2, name: "Tarefa 2", description: "Descrição da Tarefa 2", completed: true },
];

// GETs
app.get("/login", (req, res) => {
  res.render("login", {title: "Login",});
});

app.get("/register", (req, res) => {
  res.render("register", {title: "Register",});
});

app.get("/tasks", (req, res) => {
  res.render("tasks", { title: "Listagem de Tarefas", tasks });
});
app.get("/tasks/new", (req, res) => {
  res.render("taskform", { title: "Cadastrar Tarefa", task: null }); 
});

app.get("/tasks/update/:id", (req, res) => {
  const { id } = req.params;
  const task = tasks.find(t => t.id === parseInt(id)); // Encontrar tarefa por ID
  if (task) {
    res.render("taskform", { title: "Editar Tarefa", task }); 
  } else {
    res.status(404).send("Tarefa não encontrada");
  }
});

app.get("/profile", (req, res) => {
  res.send("Página de Perfil");
});

// POSTs
app.post("/login", (req, res) => {
  res.send("login realizado com sucesso");
});

app.post("/register", (req, res) => {
  res.send("Registro concluido com sucesso");
});

app.post("/tasks/new", (req, res) => {
  res.send("Nova tarefa criada");
});

app.post("/tasks/update/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Tarefa com ID: ${id} atualizada`);
});

app.post("/profile", (req, res) => {
  res.send("Perfil atualizado com sucesso");
});

// DELETE Route
app.delete("/tasks/delete/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Tarefa com ID: ${id} deletada`);
});

// Hellor World!
app.get("/", (req, res) => {
  res.render("home", {title: "home",});

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
