const TodoItem = require("../models/todoitem.model");
const config = require("../config/config");

const sequelize = require("sequelize");
const Sequelize = require("../config/database");

module.exports = {
	post_createTodoItem: async (req, res) => {
		const { title, description, userId } = req.body;

		try {
			const newTodoItem = await TodoItem.create({
				title,
				description,
				done: 0,
				userId,
			});

			if (!newTodoItem) {
				return res.status(400).json({ message: "Could not create todo item" });
			}

			return res.status(200).json({ message: "Success", todoItem: newTodoItem });
		} catch (error) {
			console.log("Todoitem creation failed", error);
			return res.status(500).json({ message: "Server error" });
		}
	},
	get_findUserTodos: async (req, res) => {
		const { userid } = req.params;

		try {
			const todos = await TodoItem.findAll({ where: { userid } });

			if (!todos) {
				return res.status(400).json({ message: "Searching failed for todo items" });
			}

			return res.status(200).json({ todoItems: todos });
		} catch (error) {
			console.log("Finding all todos failed", error);
			return res.status(500).json({ message: "Server error" });
		}
	},
	put_updateTodoItem: async (req, res) => {
		const { id, title, description, done } = req.body;

		try {
			// Først finder vi vores todo item
			const todoitem = await TodoItem.findOne({ where: { id } });

			if (!todoitem) {
				return res.status(404).json({ message: "Todo item not found" });
			}

			// Så nu opdaterer vi vores todo item
			await todoitem.update({ title, description, done });

			return res.status(200).json({ message: "Success" });
		} catch (error) {
			console.log("updating todo item failed", error);
			return res.status(500).json({ message: "Server error" });
		}
	},
	delete_deleteTodoItem: async (req, res) => {
		const { id } = req.params;

		try {
			const todoitem = await TodoItem.findOne({ where: { id } });

			if (!todoitem) {
				return res.status(400).json({ message: "Could not find todo item" });
			}

			await todoitem.destroy();

			return res.status(200).json({ message: "Deleted" });
		} catch (error) {
			console.log("deleting todo item failed", error);
			return res.status(500).json({ message: "Server error" });
		}
	},
};
