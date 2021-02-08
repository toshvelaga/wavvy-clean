const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const logger = require("morgan");

app.use(logger("dev"));
app.use(cors());

app.use(express.json({ limit: "200mb", extended: true }));
app.use(
	express.urlencoded({ limit: "200mb", extended: true, parameterLimit: 50000 })
);

var authRouter = require("./routes/jwtAuth");
var podcastsRouter = require("./routes/podcasts");
var episodesRouter = require("./routes/episodes");
var uploadRouter = require("./routes/upload");
var forgotPasswordRouter = require("./routes/forgotPassword");
var rssRouter = require("./routes/rss");
var websiteRouter = require("./routes/website");
var subscriptionRouter = require("./routes/subscription");

app.use("/", authRouter);
app.use("/", podcastsRouter);
app.use("/", episodesRouter);
app.use("/", uploadRouter);
app.use("/", forgotPasswordRouter);
app.use("/", rssRouter);
app.use("/", websiteRouter);
app.use("/", subscriptionRouter);

if (process.env.NODE_ENV === "production") {
	// serve static content
	// npm run build
	app.use(express.static(path.join(__dirname, "client/build")));

	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "client/build", "index.html"));
	});
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server is starting on port ${PORT}`);
});
