const serverless = require('serverless-http');
// The relative path goes up two levels from api.js to the CODEHIVE root,
// then into the backend folder to find your main Express app file.
const app = require('../../codehive-backend/server'); // 👈 Adjust this path if your main file is named differently (e.g., index.js)

module.exports.handler = serverless(app);