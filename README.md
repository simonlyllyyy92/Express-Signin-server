# Express-Signin-server

This is a example server created by express and mongodb cloud

1. the requireAuth is used whenever the api call requires login token.

2. in the user modal, it has a user schema which has 2 props, one for email, and one for password. both of it are required and email also need to be unique, before the user email and password to be saved in mongodb cloud, the password has been hashed for security concern.

3. in the auth routers we have 2 post methods which are signin and signup

4. in package.json, "start" scripts is created for deploying to heroku, we changed the port from static 3000 to dynamic in index.js. After pushing to github, this will be push to heroku master.

## successfully deployed to heroku

https://sampleloggingserver.herokuapp.com/
