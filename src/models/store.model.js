import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db.config.js";

const Store = sequelize.define("Store", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  region_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  score: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE(6),
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE(6),
    defaultValue: DataTypes.NOW,
  },
});

export { Store };
