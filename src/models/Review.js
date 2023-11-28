import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db.config.js";

const Review = sequelize.define("Review", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  member_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  store_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  score: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  body: {
    type: DataTypes.TEXT,
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

export { Review };
