const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
// const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");

router.post("/register", async (req, res) => {
	const { name, email, password, password2 } = req.body;

	try {
		const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
			email,
		]);

		if (name == "") {
			return res.status(401).json({ name: "Please add your full name" });
		}

		if (email == "") {
			return res.status(401).json({ email: "Please add your email" });
		}

		if (password == "" || password2 == "") {
			return res
				.status(401)
				.json({ passwordEmpty: "Please do not leave password field empty" });
		}

		if (password !== password2) {
			return res
				.status(401)
				.json({ passwordsDontMatch: "Passwords do not match" });
		}

		if (user.rows.length > 0) {
			return res.status(401).json({ user: "User already exists" });
		}

		const salt = await bcrypt.genSalt(10);
		const bcryptPassword = await bcrypt.hash(password, salt);

		let newUser = await pool.query(
			"INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
			[name, email, bcryptPassword]
		);

		const jwtToken = jwtGenerator(newUser.rows[0].user_id);

		return res.json({ jwtToken });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error occured while registering");
	}
});

router.post("/login", async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await pool.query(`SELECT * FROM users WHERE user_email = $1`, [
			email,
		]);

		if (user.rows.length === 0) {
			return res
				.status(401)
				.json({ email: "No email is associated with that account" });
		}

		const validPassword = await bcrypt.compare(
			password,
			user.rows[0].user_password
		);

		if (!validPassword) {
			return res
				.status(401)
				.json({ password: "The password entered is not correct" });
		}
		const jwtToken = jwtGenerator(user.rows[0].user_id);
		return res.json({ jwtToken });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error occurred while logging in");
	}
});

router.post("/verify", authorize, async (req, res) => {
	try {
		res.json(true);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

router.patch("/update-password", authorize, async (req, res) => {
	const { oldpassword, newpassword, newpassword2 } = req.body;
	try {
		const user = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [
			req.user.id,
		]);

		if (newpassword !== newpassword2) {
			return res
				.status(401)
				.json({ passwordsDontMatch: "Passwords do not match" });
		}

		if (newpassword == "") {
			return res
				.status(401)
				.json({ password1Empty: "Please do not leave password fields empty" });
		}

		if (newpassword2 == "") {
			return res.status(401).json({
				password2Empty: "Please do not leave password fields empty",
			});
		}

		const validPassword = await bcrypt.compare(
			oldpassword,
			user.rows[0].user_password
		);

		if (!validPassword) {
			return res
				.status(401)
				.json({ oldpassword: "The old password you have typed is incorrect" });
		}

		const salt = await bcrypt.genSalt(10);
		const newBcryptPassword = await bcrypt.hash(newpassword, salt);

		pool.query(
			`UPDATE users SET user_password = $1 WHERE user_id = $2`,
			[newBcryptPassword, req.user.id],
			(q_err, q_res) => {
				res.json(q_res.rows);
			}
		);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
