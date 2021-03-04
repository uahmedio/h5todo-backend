const express = require("express");
const passport = require("passport");

const passportConf = require("../passport"); // Has to be imported
const TodoItemController = require("../controllers/todoitem.controller");

const router = express.Router();

// Authentication Strategies
const passportJWT = passport.authenticate("jwt", { session: false });

router.get("/one/:id", passportJWT, TodoItemController.get_findTodoItemId);

router.post("/create", passportJWT, TodoItemController.post_createTodoItem);

router.get("/:userid", TodoItemController.get_findUserTodos);

router.put("/", passportJWT, TodoItemController.put_updateTodoItem);

router.delete("/:id", passportJWT, TodoItemController.delete_deleteTodoItem);

module.exports = router;
