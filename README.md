# eight
Web app to visualize sleep data 
## Backend
- Express app created to pull data from an external server
- Basic setup done by express-generator
- By going to /users/:id it will pull to cooresponding JSON file from S3 server
## Frontend
- Materialize for grid, icons, colors.
- Chartjs (by means of react-chartjs) to create the charts
### Components
1. Piechart: wrapper around react-chartjs Pie component
2. Linechart: wrapper around react-chartjs Line component
### Helpers
1. hextorgba: turn a hex color value to
2. splitoncaps: splits a string at each uppercase letter, joins them with a space, and capitalizes the first letter
### Useage
- Click on the User icons to change which user data the app displays
- The top Piecharts represent the stags of the 3 intervals (3 Nights)
- Heart Rate and Respitory Rate Linechart shows the heart rate in the same time periods.
- Bed and Room Tempature Linechart shows the coorelation between them.
