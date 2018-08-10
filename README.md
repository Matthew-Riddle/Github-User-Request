# Github-User-Request

A restful API endpoint written in javascript. Utilizes Axios to make calls to the GitHub Api, and uses Express to setup the Rest API. Returns json data, but if you would like a more readable format, there is some commented out code in 'routes/routes.js' that will change the format.

### Prerequisites

You will need VSCode or Atom installed, preferably VSCode since that is the editor this was written in.

### Installing

Clone the repo to your desired location using your terminal of choice. (CMDER is really nice)

```
https://github.com/Matthew-Riddle/Github-User-Request.git
```

Once cloned, navigate to the project directory.

```
cd C:\Users\User\Desktop\*Your Repository*
```

Now run either npm install or yarn install to get all the required packages to run the project.

```
npm install

or

yarn install
```

Now just run the start command to run the service.

```
npm start
```

If that did not work try using this instead.

```
node app.js
```

Once that is up and you get the message "app running on port. 3000", open a web browser and enter the following.

```
http://localhost:3000/
```

This will take you to the root page. To retrieve the github information about a user, just append a username to the end of the URL.

```
http://localhost:3000/matthew-riddle
```

## Built With

- [Axios](https://github.com/axios/axios) - Promise based HTTP
- [Express](https://expressjs.com/) - Web Framework

## Authors

- **Matthew Riddle** - _Initial work_ - [Matthew-Riddle](https://github.com/Matthew-Riddle)

## Acknowledgments

- Thanks to Evan for giving me a bit of direction.
- Thank you Cruz for helping me out with the algorithms and general structure.
