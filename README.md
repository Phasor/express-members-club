# Secret Message Club

Secret Message Club is a mobile responsive web app message board, where only members of the club can see who has written a post and when it was written.

## Installation

The app uses Node.js so install that globally first if required.

Install dependencies:

`npm install`

Run the development server locally:

`npm run devstart`

## Features

Anyone can create a post for all to see. 

Only Members can see the author and date of each post. To become a member, a user must sign up and then  enter a secret password ("Hooper123").

Users can become Admins by entering the Admin secret. Once they are have Admin status, they are able to delete any post.

### Technology

The app adopts an MVC approach utilising the following technologies:  

1. Node.js
2. Express.js
3. Mongoose and MongoDB backend database
4. EJS view engine
5. Passport.js for authentication and authorisation
6. Tailwind CSS for front end styling
7. Heroku for deployment, [here](https://limitless-brushlands-90651.herokuapp.com)