import React, { useEffect, useState } from "react";
import TextInputLabel from "../../components/TextInputLabel/TextInputLabel";

function Distribution() {
	return (
		<>
			<h1>Distribution</h1>
			<div className="edit-container">
				<p>
					You have the option to distribute your Podcast as either: PUBLIC OR
					PRIVATE
				</p>
				<br></br>
				<h4>Subscribe Links</h4>
				<br></br>
				<p>
					Enter the links to your show to create subscribe links on your podcast
					pages.
				</p>
				<p>
					Public Podcast RSS Feed: https://santhosh-velaga.castos.com/feed
					https://santhosh-velaga.castos.com/feed
				</p>
				<br></br>
				<TextInputLabel label="Apple Podcasts" />
				<TextInputLabel label="Amazon" />
				<TextInputLabel label="Stitcher" />
				<TextInputLabel label="Google Play" />
				<TextInputLabel label="Pocket Casts" />
				<TextInputLabel label="Castro" />
				<h4>Integrations</h4>
				<p>
					Integrate your podcast with these services, directly from your Castos
					account.
				</p>
			</div>
		</>
	);
}

export default Distribution;
