# Wavvy

PLEASE NOTE: I am no longer actively maintaining this project. Last time I checked we have more than >3000 users registered. If you would like to use this project for commerical purposes feel free to reach out to me at toshvelaga@gmail.com. Happy to help :)

Wavvy is a full stack software project that allows users to host podcasts. Software allows users to manage their podcasts and episodes, create an RSS feed for itunes/spotify, and create a personalized website to share social media links. Software is in dark mode by default. Check out our [Product Hunt Launch](https://www.producthunt.com/posts/wavvy) for more info.

<span style="display:block" class="note">
  <img src="https://voiceblasts1.s3.amazonaws.com/Screen+Shot+2021-02-14+at+10.55.07+AM.png">
</span>

## Tech/framework used

Frontend tech stack:

- React JS
- CSS
- Redux
- React Router
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Toast Notifications](https://jossmac.github.io/react-toast-notifications/)

Backend tech stack:

- Node
- Express
- PostgresSQL
- Nodemailer
- AWS SDK

Frontend of the app is in the client folder. Under src directory store folder contains all of the redux actions and reducers. The website folder is responsible for building the landing page.

Edit index.js to change the server connection. Middleware, routes, and utils directories contain server code for API endpoints.

Hosted on Heroku: Folder structure is set up specifically to be compatible with Heroku

Production site is deployed to [wavvy.us](https://www.wavvy.us/) 

Here is a quick [Loom demo](https://www.loom.com/share/b46061898fc54d15870cd734b96886a6) 

## Installation

To run this project, install it locally using npm:

```
$ cd client
$ npm install
$ npm start
```

to run the Node JS server:

```
$ node index.js
```

In the root directory create a .env file with the values from env.txt

## Contribute

Feel free to use code however you would like.

If you have any questions feel free to email me at toshvelaga@gmail.com

## License

MIT © Tosh Velaga
