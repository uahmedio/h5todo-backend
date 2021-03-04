const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const User = require("../models/user.model");
const config = require("../config/config");

// const crypto = require("crypto");

// const ENCRYPTION_KEY = config.CRYPTO_SECRET; // Must be 256 bits (32 characters)
// const IV_LENGTH = 16; // For AES, this is always 16

// function encrypt(text) {
// 	let iv = crypto.randomBytes(IV_LENGTH);
// 	let cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), iv);
// 	let encrypted = cipher.update(text);

// 	encrypted = Buffer.concat([encrypted, cipher.final()]);

// 	return iv.toString("hex") + ":" + encrypted.toString("hex");
// }

// function decrypt(text) {
// 	let textParts = text.split(":");
// 	let iv = Buffer.from(textParts.shift(), "hex");
// 	let encryptedText = Buffer.from(textParts.join(":"), "hex");
// 	let decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), iv);
// 	let decrypted = decipher.update(encryptedText);

// 	decrypted = Buffer.concat([decrypted, decipher.final()]);

// 	return decrypted.toString();
// }

const crypto = require("crypto");

const algorithm = "aes-256-ctr";
const secretKey = "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3";
const iv = crypto.randomBytes(16);

const encrypt = (text) => {
	const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

	const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

	return {
		iv: iv.toString("hex"),
		content: encrypted.toString("hex"),
	};
};

const decrypt = (hash) => {
	const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, "hex"));

	const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, "hex")), decipher.final()]);

	return decrpyted.toString();
};

var CryptoJS = require("crypto-js");

const TodoItem = sequelize.define(
	"todoitem",
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
			unique: true,
		},
		title: {
			type: Sequelize.TEXT("long"),
			allowNull: false,
			// get() {
			// 	// const deText = decrypt(this.dataValues.title);

			// 	// Decrypt
			// 	// var bytes = CryptoJS.AES.decrypt(this.dataValues.title, config.CRYPTO_SECRET);
			// 	// var originalText = bytes.toString(CryptoJS.enc.Utf8);

			// 	const originalText = decrypt(this.dataValues.title);

			// 	return originalText;
			// },
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
	},
	{
		hooks: {
			beforeCreate: (todoitem, options) => {
				// const text = encrypt(todoitem.title);

				// Encrypt
				// var ciphertext = CryptoJS.AES.encrypt(todoitem.title, config.CRYPTO_SECRET).toString();

				todoitem.title = todoitem.title;
			},
		},
	}
);

module.exports = TodoItem;
