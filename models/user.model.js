const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
const moment = require("moment");

const sequelize = require("../config/database");

const User = sequelize.define(
	"user",
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
			unique: true,
		},
		firstName: {
			type: Sequelize.STRING(55),
			allowNull: false,
		},
		lastName: {
			type: Sequelize.STRING(55),
			allowNull: true,
		},
		email: {
			type: Sequelize.STRING(155),
			allowNull: false,
			unique: true,
		},
		password: {
			type: Sequelize.STRING(255),
			allowNull: false,
		},
	},
	{
		hooks: {
			beforeCreate: (user, options) => {
				user.password = bcrypt.hashSync(user.password, 10);
			},
			beforeUpdate: (user, options) => {
				if (user.password !== user._previousDataValues.password) {
					user.password = bcrypt.hashSync(user.password, 10);
				}
			},
		},
	}
);

module.exports = User;
