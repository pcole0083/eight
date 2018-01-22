# eight
Web app to visualize sleep data 
## Backend
- Express app created to pull data from an external server
- Basic setup done by express-generator
- By going to /users/:id it will pull to cooresponding JSON file from S3 server
- Uses r2 module to polyfill fetch api to make async calls to S3
- Build on Node v8.9.4
## Frontend
- Create React App was used to generate the starting point of the Frontend app.
- Materialize CSS for grid, icons, colors.
- Chartjs (by means of react-chartjs) to create the charts.
- Uses Fetch API to do a async calls to the backend to get the json data.
### Components
1. Piechart: wrapper around react-chartjs Pie component
2. Linechart: wrapper around react-chartjs Line component
### Helpers
1. hextorgba: turn a hex color value to
2. splitoncaps: splits a string at each uppercase letter, joins them with a space, and capitalizes the first letter
### Useage
- Click on the User icons to change which user data the app displays
- The top Piecharts represent the stags of the 3 intervals (3 Nights)
- Number of Toss and Turns shown below Piecharts because high number seems to less deep sleep time.
- Heart Rate and Respitory Rate Linechart shows the heart rate in the same time periods.
- Bed and Room Tempature Linechart shows the coorelation between them.
### Run Locally
1. Clone this repo
2. cd ./eight (or install folder)
3. npm install
4. cd ./client
5. npm install
6. In the root folder run: PORT=3001 node bin/www
7. Open a new terminal tab,cd ./client.
8. Run npm start.
9. Go to http://localhost:3000/ to view the app.
