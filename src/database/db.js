import { Sequelize } from "sequelize";

const sequelize = new Sequelize("web", "root", "12345678", {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
    logging: console.log,
  });

  export default sequelize;