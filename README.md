# Egg-cercise
## Contributors 
Jaden Booher  
Stephen Kelman  
Paul Serafimescu  
Adrian Hung


## How to get and start the app
### 1. Run the following in a terminal of your choice (if you have not already cloned the repo)
`git clone https://github.com/stephenKaliman/CS-97-Project`

### 2. Cd into the 'egg-cercise' directory
`cd CS-97-Project/egg-cercise/`

### 3. Run npm install to install all the nodes for react
`npm install`
or
`sudo npm install`
#### If you get an error message, make sure you have installed node and npm:
[follow instructions here](https://www.npmjs.com/get-npm)

### 4. Cd into the 'server' repo located at /egg-cercise/server
`cd server/`

### 5. Start node.js
`node index.js`

### 6. Cd into the 'egg-cercise' repo located at /egg-cercise
`cd CS-97-Project/egg-cercise/`
(Note: you may have to do this from a different terminal)

### 7. Start up react<sup>[1]</sup>
`npm start`
(it may tell you that the server is running on port 3000 and ask if you want to run the app on another port. In this case, just type "y")

### 8. By default, "localhost:3001" should open up in your default browser. Take a look around at our app!

## [1] If you have problems with npm start
If your project is starting and directly sends you to 
"localhost:3000" instad of "localhost:3001", run this command before trying step 7 again:
`export PORT=3001`
