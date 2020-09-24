# LinkIt
LinkIt is a social media web application for developers. User can register to the website and login, create posts, like and comment on the posts.

## Technologies used
It is built using MERN(Mongodb, Express, React, Nodejs) stack. Json Web Token is used for authentication and redux is used for state management

## Install server dependencies
```
npm install
```
## Install client dependencies
```
cd client
npm install
```

## Configure environment variables
Create a config folder in root and within the config folder create default.json with following data
```
{
  "mongoURI": "<mongo_uri>",
  "jwtSecret": "<secret>",
  "githubToken": "<githubaccesstoken>"
}
```

## Run both express and react from root
```
npm run dev
```

