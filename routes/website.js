const express = require("express");
const router = express.Router();
const pool = require("../db");
const authorize = require("../middleware/authorize");

router.put(
	"/api/post/website/social-media-links/:id",
	authorize,
	(req, res, next) => {
		const values = [
			req.body.instagram,
			req.body.facebook,
			req.body.twitter,
			req.body.youtube,
			req.body.tiktok,
			req.params.id,
		];

		pool.query(
			`INSERT INTO websites (instagram, facebook, twitter, youtube, tiktok, pid)
			VALUES($1, $2, $3, $4, $5, $6)
			ON CONFLICT (pid) DO UPDATE SET instagram = EXCLUDED.instagram, 
			facebook = EXCLUDED.facebook, twitter = EXCLUDED.twitter, youtube = EXCLUDED.youtube,
			tiktok = EXCLUDED.tiktok, pid = EXCLUDED.pid`,
			values,
			(q_err, q_res) => {
				if (q_err) return next(q_err);
				res.json(q_res.rows);
			}
		);
	}
);

router.put(
	"/api/post/website/support-links/:id",
	authorize,
	(req, res, next) => {
		const values = [
			req.body.patreon,
			req.body.cashapp,
			req.body.bitcoinwallet,
			req.params.id,
		];

		pool.query(
			`INSERT INTO websites (patreon, cashapp, bitcoinwallet, pid)
			VALUES($1, $2, $3, $4)
			ON CONFLICT (pid) DO UPDATE SET patreon = EXCLUDED.patreon, 
			cashapp = EXCLUDED.cashapp, bitcoinwallet = EXCLUDED.bitcoinwallet, 
			pid = EXCLUDED.pid`,
			values,
			(q_err, q_res) => {
				if (q_err) return next(q_err);
				res.json(q_res.rows);
			}
		);
	}
);

router.put(
	"/api/post/website/subscribe-links/:id",
	authorize,
	(req, res, next) => {
		const values = [
			req.body.itunes,
			req.body.spotify,
			req.body.googlepodcasts,
			req.body.rssfeed,
			req.body.overcast,
			req.body.stitcher,
			req.params.id,
		];

		pool.query(
			`INSERT INTO websites (itunes, spotify, googlepodcasts,
			rssfeed, overcast, stitcher, pid)
			VALUES($1, $2, $3, $4, $5, $6, $7)
			ON CONFLICT (pid) DO UPDATE SET itunes = EXCLUDED.itunes, 
			spotify = EXCLUDED.spotify, googlepodcasts = EXCLUDED.googlepodcasts,
			rssfeed = EXCLUDED.rssfeed, overcast = EXCLUDED.overcast, stitcher = EXCLUDED.stitcher,
			pid = EXCLUDED.pid`,
			values,
			(q_err, q_res) => {
				if (q_err) return next(q_err);
				res.json(q_res.rows);
			}
		);
	}
);

router.get("/api/get/website/links/:id", (req, res, next) => {
	const pid = req.params.id;

	pool.query(
		`SELECT * FROM websites
		WHERE pid = ${pid}`,
		(q_err, q_res) => {
			if (q_err) {
				console.log(q_err);
			}
			res.json(q_res.rows[0]);
		}
	);
});

module.exports = router;
