const express = require("express");
const router = express.Router();
const pool = require("../db");
const Podcast = require("podcast");

// node podcast module: https://github.com/maxnowack/node-podcast
// npm page for podcast: https://www.npmjs.com/package/podcast
// npm page for rss: https://www.npmjs.com/package/rss

router.get("/get-rss-feed/:id", async (req, res) => {
	try {
		const podcastData = await pool.query(
			`SELECT * FROM podcasts WHERE pid = $1`,
			[req.params.id]
		);

		const episodeData = await pool.query(
			`SELECT * FROM episodes WHERE pid = $1`,
			[req.params.id]
		);

		const episodeDataRows = episodeData.rows;

		// required: title, description, image, language, category, explicit
		// recommended: itunes:author, link (website associated with podcast), itunes:owner

		feedOptions = {
			title: podcastData.rows[0].podcast_title,
			copyright: podcastData.rows[0].copyright,
			description: podcastData.rows[0].podcast_description,
			itunesAuthor: podcastData.rows[0].author,
			itunesSubtitle: podcastData.rows[0].podcast_subtitle,
			itunesSummary: podcastData.rows[0].podcast_summary,
			itunesOwner: {
				name: podcastData.rows[0].fullname,
				email: podcastData.rows[0].contact_email,
			},
			// itunesType: need to add field in DB
			itunesImage: podcastData.rows[0].cover_artwork,
			language: podcastData.rows[0].language.value,
			// itunesCategory: podcastData.rows[0].category,
			itunesCategory: [
				{
					text: podcastData.rows[0].podcast_category.value.category,
					subcats: [
						{
							text: podcastData.rows[0].podcast_category.value.subcategory,
						},
					],
				},
			],
			itunesExplicit: podcastData.rows[0].podcast_explicit_content,
		};

		const feed = new Podcast(feedOptions);

		episodeDataRows.map((data) =>
			feed.addItem({
				title: data.episode_title,
				enclosure: {
					url: data.episode_audio,
					length: data.episode_audio_length,
					type: data.episode_audio_type,
				},
				description: data.episode_description,
				itunesExplicit: data.episode_explicit_content,
			})
		);

		// need to get length and type of file

		const xml = feed.buildXml();

		res.set("Content-Type", "text/xml");

		res.send(xml);
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
