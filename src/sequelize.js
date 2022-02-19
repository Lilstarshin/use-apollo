// @ts-check

require('dotenv').config();
const { DB_NAME, DB_USER, DB_PASS, DIALECT, HOST } = process.env;
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(`${DIALECT}://${HOST}:5432/${DB_NAME}`, {
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASS,
});
const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
const City = sequelize.define(
  'city',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
User.belongsTo(City);

module.exports = {
  sequelize,
  User,
  City,
};
