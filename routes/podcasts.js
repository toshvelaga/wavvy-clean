const express = require("express");
const router = express.Router();
const pool = require("../db");
// const validInfo = require("../middleware/validInfo");
const authorize = require("../middleware/authorize");

router.post("/api/post/podcasts", authorize, (req, res, next) => {
	const values = [
		req.body.podcast_title,
		req.body.podcast_subtitle,
		req.body.podcast_description,
		req.body.language,
		req.body.podcast_category,
		req.body.cover_artwork,
		req.body.website,
		req.body.copyright,
		req.body.host_name,
		req.body.contact_email,
		req.body.author,
		req.body.podcast_explicit_content,
		req.user.id,
	];

	if (req.body.podcast_title == "") {
		return res
			.status(401)
			.json({ podcastTitle: "Please do not leave podcast title empty" });
	}

	pool.query(
		`INSERT INTO podcasts(podcast_title, podcast_subtitle, podcast_description,
		language, podcast_category, cover_artwork, website, copyright,
		host_name, contact_email, author, podcast_explicit_content, user_id, date_created)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW() )`,
		values,
		(q_err, q_res) => {
			if (q_err) return next(q_err);
			res.json(q_res.rows);
		}
	);
});

router.get("/api/get/podcasts", authorize, async (req, res, next) => {
	try {
		console.log(req.user.id);
		const user = await pool.query(
			`SELECT * 
			FROM users 
			RIGHT JOIN podcasts 
			ON users.user_id = podcasts.user_id 
			WHERE users.user_id = $1 
			ORDER BY pid DESC`,
			[req.user.id]
		);
		res.json(user.rows);
	} catch (err) {
		console.log(err.message);
		res.status(500).send("Server Error on Getting Podcasts");
	}
});

router.get("/api/get/podcasts/options", authorize, async (req, res, next) => {
	try {
		console.log(req.user.id);
		const user = await pool.query(
			`SELECT pid, podcast_title FROM users RIGHT JOIN podcasts ON users.user_id = podcasts.user_id WHERE users.user_id = $1`,
			[req.user.id]
		);
		res.json(user.rows);
	} catch (err) {
		console.log(err.message);
		res.status(500).send("Server Error on Getting Podcasts Options");
	}
});

router.get(
	"/api/get/podcasts/settings/:id",
	authorize,
	async (req, res, next) => {
		try {
			console.log(req.user.id);
			const pid = req.params.id;

			const podNum = await pool.query(
				`SELECT * FROM episodes WHERE pid = ${pid}`
			);

			console.log(podNum.rows.length);

			const user = await pool.query(
				`SELECT * FROM users RIGHT JOIN podcasts ON users.user_id = podcasts.user_id WHERE users.user_id = $1 AND podcasts.pid = $2`,
				[req.user.id, pid]
			);
			res.json(user.rows[0]);
		} catch (err) {
			console.log(err.message);
			res.status(500).send("Server Error on Getting Podcast with id");
		}
	}
);

// for public website

router.get("/api/get/podcast/public-site/:id", async (req, res, next) => {
	try {
		const id = req.params.id;

		pool.query(
			`SELECT * 
			FROM podcasts
			WHERE pid = ${id}`,
			(q_err, q_res) => {
				res.json(q_res.rows[0]);
			}
		);
	} catch (err) {
		console.log(err.message);
		res.status(500).send("Server Error on Getting Podcast with id");
	}
});

router.get(
	"/api/get/podcasts/settings/:id/num-of-podcasts",
	authorize,
	async (req, res, next) => {
		try {
			const pid = req.params.id;

			const podData = await pool.query(
				`SELECT * FROM episodes WHERE pid = ${pid}`
			);

			const podNum = podData.rows.length;

			res.json(podNum);
		} catch (err) {
			console.log(err.message);
			res
				.status(500)
				.send("Server Error on Getting Number of Podcast Episodes");
		}
	}
);

router.put("/api/update/podcast/settings/:id", authorize, (req, res, next) => {
	const values = [
		req.body.podcast_title,
		req.body.podcast_subtitle,
		req.body.language,
		req.body.podcast_category,
		req.body.cover_artwork,
		req.body.website,
		req.body.copyright,
		req.body.host_name,
		req.body.contact_email,
		req.body.author,
		req.body.podcast_explicit_content,
		req.body.podcast_description,
		req.params.id,
	];
	pool.query(
		`UPDATE podcasts SET 
		podcast_title = $1, podcast_subtitle = $2, language = $3, 
		podcast_category = $4, cover_artwork = $5, 
		website = $6, copyright = $7, 
		host_name = $8, contact_email = $9, 
		author = $10, podcast_explicit_content = $11, podcast_description = $12 WHERE pid = $13`,
		values,
		(q_err, q_res) => {
			if (q_err) return next(q_err);
			res.json(q_res.rows);
		}
	);
});

router.delete("/api/delete/podcasts/:id", authorize, async (req, res, next) => {
	const id = req.params.id;

	try {
		await pool.query(`DELETE FROM episodes WHERE pid = ${id}`);

		await pool.query(
			`DELETE FROM podcasts WHERE pid = ${id}`,
			(q_err, q_res) => {
				res.json(q_res.rows);
				if (q_err) throw q_err;
			}
		);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error on deleting episodes");
	}
});

module.exports = router;
