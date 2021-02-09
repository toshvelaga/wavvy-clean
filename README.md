# Wavvy

Wavvy is a full stack software project that allows users to host podcasts. Software allows users to manage their podcasts and episodes, create an RSS feed for itunes/spotify, and create a personalized website to share social media links. Software is in dark mode by default.

## Tech/framework used

Frontend tech stack:

- create-react-app
- React JS
- CSS,
- Redux,
- React Router,
- React Icons

Backend tech stack:

- Node
- Express
- PostgresSQL,
- Nodemailer,
- AWS SDK,

Toast Notifications: https://jossmac.github.io/react-toast-notifications/

Payments: https://stripe.com/docs/billing/subscriptions/overview

Hosted on Heroku: Folder structure is set up specifically to be compatible with Heroku

Frontend of the app is in the client folder. Edit index.js to change the server connection. Middleware, routes, and utils directories contain server code for API endpoints.

Production site is deployed to https://www.wavvy.us/

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
