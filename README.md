# Secret Message Club

Secret Message Club is a message board where only members of the club can reveal who has written a post.

## Installation

The app uses Node.js and Express.

`npm run devstart`

## Features

Anyone can create a post for all to see. 

Only Members can see the author and date of each post. To become a member, a user must sign up and then  enter a secret password ("Hooper123").

Users can become Admins by entering the Admin secret. Once they are have Admin status, they are able to delete any post.

### Technology

The app uses a MVC approach. 

1. Node.js
2. Express.js
3. Mongoose and MongoDB backend database
4. EJS view engine
5. Passport.js for authentication and authorisation
6. Tailwind CSS for front end styling
7. Heroku for deployment, [here](https://limitless-brushlands-90651.herokuapp.com)