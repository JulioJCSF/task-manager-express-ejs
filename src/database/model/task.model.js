import { DataTypes, Model } from "sequelize";

import db from "../db.js";

class Task extends Model {}

Task.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isFinished: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize: db,
    modelName: "Task",
    tableName: "tasks",
    underscored: true,
  }
);

export default Task;
