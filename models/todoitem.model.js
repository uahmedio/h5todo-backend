const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const User = require("../models/user.model");

const TodoItem = sequelize.define("todoitem", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		unique: true,
	},
	title: {
		type: Sequelize.STRING(55),
		allowNull: false,
	},
	description: {
		type: Sequelize.STRING(255),
		allowNull: true,
	},
	done: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
	},
	userId: {
		type: Sequelize.INTEGER,
		allowNull: false,
		references: {
			model: User,
			key: "id",
		},
	},
});

module.exports = TodoItem;
