import { DataTypes, Model } from "sequelize";
import db from "../db.js";

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
          unique: true,
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
      underscored: true,
  }
);

export default User;