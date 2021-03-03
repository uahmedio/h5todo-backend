const User = require("../models/user.model");
const JWT = require("jsonwebtoken");
const config = require("../config/config");

const sequelize = require("sequelize");
const Sequelize = require("../config/database");

// Funktion til at lave en jwt token
const signToken = (user) => {
	return (
		"JWT " +
		JWT.sign(
			{
				iss: "planner",
				sub: user.id,
				iat: Math.floor(Date.now() / 1000) - 30, // current time - 30 seconds
				exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // current time + 1 hour ahead
			},
			config.JWT_SECRET
		)
	);
};

module.exports = {
	post_createUser: async (req, res) => {
		const { firstName, lastName, email, password } = req.body;

		try {
			// Tjek om der en bruger der allerede findes med den email
			const emailExist = await User.findAll({ where: { email } });
			if (emailExist.length > 0) {
				return res.status(409).json({ message: "User already exist" });
			}

			const newUser = await User.create({
				firstName,
				lastName,
				email,
				password,
			});

			if (!newUser) {
				return res.status(400).json({ message: "Could not create user" });
			}

			const token = signToken(newUser);

			return res.status(200).json({ user: newUser, token, message: "Success" });
		} catch (error) {
			console.log("User creation", error);
			return res.status(500).json({ message: "Server error" });
		}
	},
	get_findAllUser: async (req, res) => {
		try {
			const users = await User.findAll();

			if (!users) {
				return res.status(404).json({ message: "Errors searching for users" });
			}
			return res.status(200).json({ users });
		} catch (error) {
			console.log("User creation", error);
			return res.status(500).json({ message: "Server error" });
		}
	},
	post_login: async (req, res) => {
		const token = signToken(req.user);
		return res.status(200).json({ token, user: req.user });
	},
	get_secret: async (req, res) => {
		return res.status(200).json({ message: "We are in secret" });
	},
};
