const express = require("express");
const router = express.Router();
const pool = require("../db");
const authorize = require("../middleware/authorize");
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const sharp = require("sharp");
require("dotenv").config();

// upload image to S3 tutorial: https://www.youtube.com/watch?v=TtuCCfren_I&t=33s&ab_channel=GeniusCoders

const s3 = new AWS.S3({
	accessKeyId: process.env.AWS_ID,
	secretAccessKey: process.env.AWS_SECRET,
});

const storage = multer.memoryStorage({
	destination: function (req, file, callback) {
		callback(null, "");
	},
});

// upload images

// https://github.com/lovell/sharp

const upload = multer({ storage }).single("image");

router.post("/upload-cover-art", upload, async (req, res) => {
	let myFile = req.file.originalname.split(".");
	const fileType = myFile[myFile.length - 1];

	const resizedFile = await sharp(req.file.buffer).resize(1400, 1400);

	const params = {
		Bucket: process.env.AWS_BUCKET_NAME,
		Key: `cover_artwork/${uuidv4()}.${fileType}`,
		Body: resizedFile,
	};

	s3.upload(params, (error, data) => {
		if (error) {
			res.status(401).json({
				image: "Error occured while uploading image. Don't leave blank",
			});
		}

		res.status(200).send(data);
	});
});

router.post("/upload-episode-art", upload, async (req, res) => {
	let myFile = req.file.originalname.split(".");
	const fileType = myFile[myFile.length - 1];

	const resizedFile = await sharp(req.file.buffer).resize(1400, 1400);

	const params = {
		Bucket: process.env.AWS_BUCKET_NAME,
		Key: `episode_artwork/${uuidv4()}.${fileType}`,
		Body: resizedFile,
	};

	s3.upload(params, (error, data) => {
		if (error) {
			res.status(500).json({
				image: "Error occured while uploading image. Don't leave blank",
			});
		}

		res.status(200).send(data);
	});
});

// upload audio

const audioupload = multer({ storage }).single("audio");

router.post("/upload-audio", audioupload, (req, res) => {
	let myFile = req.file.originalname.split(".");
	const fileType = myFile[myFile.length - 1];

	const params = {
		Bucket: process.env.AWS_BUCKET_NAME,
		Key: `audio/${uuidv4()}.${fileType}`,
		Body: req.file.buffer,
	};

	s3.upload(params, (error, data) => {
		if (error) {
			res.status(500).send(error);
		}

		res.status(200).send(data);
	});
});

module.exports = router;
