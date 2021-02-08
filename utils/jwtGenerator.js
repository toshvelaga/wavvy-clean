const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtGenerator = (user_id) => {
	const payload = {
		user: {
			id: user_id,
		},
	};

	return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "12hr" });
};

module.exports = jwtGenerator;
