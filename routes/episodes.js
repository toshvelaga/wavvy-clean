const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
// const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");

router.post("/api/post/episodes/:id", authorize, (req, res, next) => {
	const values = [
		req.body.episode_title,
		req.body.episode_audio,
		req.body.episode_description,
		req.body.episode_artwork,
		req.body.season_number,
		req.body.episode_number,
		req.body.episode_type,
		req.body.episode_explicit_content,
		req.body.episode_contributors,
		req.body.search_keywords,
		req.user.id,
		req.params.id,
		req.body.audio_duration,
		req.body.episode_audio_length,
		req.body.episode_audio_type,
		req.body.episode_date_created,
	];
	pool.query(
		`INSERT INTO episodes(episode_title, episode_audio,
			episode_description, episode_artwork, season_number, episode_number,
			episode_type, episode_explicit_content, episode_contributors, search_keywords,
		    user_id, pid, audio_duration, episode_audio_length, episode_audio_type, episode_date_created)
                VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16 )`,
		values,
		(q_err, q_res) => {
			if (q_err) return next(q_err);
			res.json(q_res.rows);
		}
	);
});

router.post("/api/post/new-episode", authorize, (req, res, next) => {
	const values = [
		req.body.episode_title,
		req.body.episode_audio,
		req.body.episode_description,
		req.body.episode_artwork,
		req.body.season_number,
		req.body.episode_number,
		req.body.episode_type,
		req.body.episode_explicit_content,
		req.body.episode_contributors,
		req.body.search_keywords,
		req.user.id,
		req.body.pid,
		req.body.audio_duration,
		req.body.episode_date_created,
	];
	pool.query(
		`INSERT INTO episodes(episode_title, episode_audio,
			episode_description, episode_artwork, season_number, episode_number,
			episode_type, episode_explicit_content, episode_contributors, search_keywords, user_id, pid, audio_duration, episode_date_created)
                VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14 )`,
		values,
		(q_err, q_res) => {
			if (q_err) return next(q_err);
			res.json(q_res.rows);
		}
	);
});

router.get("/api/get/episodes", authorize, async (req, res, next) => {
	const user = await pool.query(
		`SELECT * 
		FROM users 
		RIGHT JOIN episodes 
		ON users.user_id = episodes.user_id 
		INNER JOIN podcasts
		ON podcasts.pid = episodes.pid 
		WHERE users.user_id = $1
		ORDER BY eid DESC`,
		[req.user.id]
	);
	res.json(user.rows);
});

// `SELECT * FROM users RIGHT JOIN episodes ON users.user_id = episodes.user_id WHERE users.user_id = $1 ORDER BY eid DESC`,

router.get("/api/get/episodes/:eid", authorize, (req, res, next) => {
	const eid = req.params.eid;

	pool.query(
		`SELECT * 
		FROM episodes
		RIGHT JOIN podcasts 
		ON episodes.pid = podcasts.pid
		WHERE eid = ${eid}`,
		(q_err, q_res) => {
			res.json(q_res.rows[0]);
		}
	);
});

router.get("/api/get/episodes/public/:eid", (req, res, next) => {
	const eid = req.params.eid;

	pool.query(
		`SELECT * 
		FROM episodes
		RIGHT JOIN podcasts 
		ON episodes.pid = podcasts.pid
		WHERE eid = ${eid}`,
		(q_err, q_res) => {
			res.json(q_res.rows[0]);
		}
	);
});

router.get("/api/get/podcast/:pid/episodes", authorize, (req, res, next) => {
	const pid = req.params.pid;

	pool.query(
		`SELECT * FROM episodes WHERE pid = ${pid} ORDER BY eid DESC`,
		(q_err, q_res) => {
			if (q_err) return next(q_err);
			res.json(q_res.rows);
		}
	);
});

router.delete("/api/delete/episodes/:eid", authorize, (req, res, next) => {
	const eid = req.params.eid;

	pool.query(`DELETE FROM episodes WHERE eid = ${eid}`, (q_err, q_res) => {
		res.json(q_res.rows);
	});
});

router.put("/api/update/episodes/:eid", (req, res, next) => {
	const eid = req.params.eid;

	const values = [
		req.body.episode_title,
		req.body.episode_audio,
		req.body.episode_description,
		req.body.episode_artwork,
		req.body.season_number,
		req.body.episode_number,
		req.body.episode_type,
		req.body.episode_explicit_content,
		req.body.episode_contributors,
		req.body.search_keywords,
		eid,
	];

	pool.query(
		`UPDATE episodes SET episode_title=$1, episode_audio=$2, 
		episode_description=$3, episode_artwork=$4, season_number=$5,
		episode_number=$6, episode_type=$7, episode_explicit_content=$8,
		episode_contributors=$9, search_keywords=$10 WHERE eid = $11`,
		values,
		(q_err, q_res) => {
			res.json(q_res.rows);
		}
	);
});

router.patch("/api/update/episodes/:eid/views", async (req, res) => {
	const eid = req.params.eid;
	try {
		pool.query(
			`UPDATE episodes 
   			SET episode_audio_plays = episode_audio_plays + 1
			WHERE eid = ${eid}`,
			(q_err, q_res) => {
				res.json(q_res.rows);
			}
		);
	} catch (error) {
		console.log(error);
	}
});

router.patch("/api/update/episodes/:eid/views/completed", async (req, res) => {
	const eid = req.params.eid;
	try {
		pool.query(
			`UPDATE episodes 
   			SET episode_audio_plays_completed = episode_audio_plays_completed + 1
			WHERE eid = ${eid}`,
			(q_err, q_res) => {
				res.json(q_res.rows);
			}
		);
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
