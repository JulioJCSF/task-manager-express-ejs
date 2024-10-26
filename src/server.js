import express from "express";
import { DataTypes, Model, Sequelize } from "sequelize";
import { body, validationResult } from "express-validator";

const app = express();
const port = 3000;

const db = new Sequelize("web", "root", "12345678", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
  logging: console.log,
});


db.authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco de dados:", err);
  });

class User extends Model {}

User.init(
  {
      name: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      email: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false,
      },
  },
  {
      sequelize: db,
      modelName: "User",
      tableName: "users",
  }
);


app.set('view engine', 'ejs');

app.use("/public", express.static("./assets"));
app.use(express.urlencoded({ extended: true }));

//Lista de Tarefas 
let tasks = [
  { id: 1, name: "Tarefa 1", description: "Descrição da Tarefa 1", completed: false },
  { id: 2, name: "Tarefa 2", description: "Descrição da Tarefa 2", completed: true },
];

// GETs
app.get("/login", (req, res) => {
  res.render("login", {title: "Login", showError: false });
});

app.get("/register", (req, res) => {
  res.render("register", { title: "Register", errors: [] });
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
app.post(
  "/login",
  body("email").trim().isEmail().notEmpty(),
  body("password").trim().notEmpty(),
  (req, res) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
      return res.redirect("/home");
    } else {
       return res.render("login", {
        title: "Login",
        showError: true,
        message: "Email ou senha inválidos, por favor verifique e tente novamente.",
      });
    }
  }
);

app.post(
  "/register",
  body("name").trim().notEmpty().withMessage("O nome é obrigatório."),
  body("email").trim().isEmail().withMessage("Insira um e-mail válido.").notEmpty(),
  body("password").trim().isLength({ min: 6 }).withMessage("A senha deve ter pelo menos 6 caracteres."),
  body("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("As senhas não coincidem.");
      }
      return true;
    }),
  async (req, res) => {
    const errors = validationResult(req);
    console.log("Erro Validacao: " + errors.array()); // Retorna no console para melhor vizualicao
    if (!errors.isEmpty()) {
      return res.render("register", {
        title: "Register",
        errors: errors.array(),
      });
    }

    const { name, email, password } = req.body;
    console.log("Dados de registro recebidos:", { name, email });

    try {
      // Verificar se o e-mail já está cadastrado
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        console.log("O e-mail já está registrado."); // Retorna no console para melhor vizualicao
        return res.render("register", {
          title: "Register",
          errors: [{ msg: "Este e-mail já está registrado." }],
        });
      }

      // Criar o novo usuário no banco de dados
      // eslint-disable-next-line no-unused-vars
      const newUser = await User.create({
        name,
        email,
        password,
      });
      console.log("Usuário criado:", newUser.toJSON()); // Retorna no console para melhor vizualicao

      // Redirecionar para uma página de sucesso ou login após o registro
      res.redirect("/login");
    } catch (err) {
      console.error("Erro ao registrar o usuário:", err); // Retorna no console para melhor vizualicao
      res.status(500).send("Ocorreu um erro no servidor.");
    }
  }
);


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
app.get("/home", async(req, res) => {

  //const user = await User.findByPk(2)
  //console.log(user.dataValues.name)

  res.render("home", {title: "home",});

});

app.listen(port, async() => {
  console.log(`Example app listening on port ${port}`);

  await db.sync({ force: true });
  console.log('All models were synchronized successfully.');
});
