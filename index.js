const env = require("dotenv").config();
const express = require("express");
const https = require("https");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");

const port = 3001;
app = express();

const UserRoutes = require("./routes/user.route");
const TodoItemRoutes = require("./routes/todoitem.route");

const UserModel = require("./models/user.model");
const TodoItemModel = require("./models/todoitem.model");
// TodoItemModel.sync();

var key = fs.readFileSync("./selfsigned.key");
var cert = fs.readFileSync("./selfsigned.crt");
var options = {
	key: key,
	cert: cert,
};

// express middlewares
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
app.use(cors());
app.use(express.json());

app.use("/api/user", UserRoutes);
app.use("/api/todoitem", TodoItemRoutes);

// Opret vores server configuration med HTTPS
var server = https.createServer(options, app);

server.listen(port, () => {
	console.log("Server running on port: " + port);
});
