const express = require("express");
const passport = require("passport");

const passportConf = require("../passport"); // Has to be imported
const TodoItemController = require("../controllers/todoitem.controller");

const router = express.Router();

// Authentication Strategies
const passportJWT = passport.authenticate("jwt", { session: false });

router.post("/create", passportJWT, TodoItemController.post_createTodoItem);

router.get("/:userid", passportJWT, TodoItemController.get_findUserTodos);

router.put("/:id", passportJWT, TodoItemController.put_updateTodoItem);

router.delete("/:id", passportJWT, TodoItemController.delete_deleteTodoItem);

module.exports = router;
