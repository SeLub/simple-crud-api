
const { handleGETrequest } = require('./controllers/handleGETrequest');
const { handleDELETErequest } = require('./controllers/handleDELETErequest');
const { handlePOSTrequest } = require('./controllers/handlePOSTrequest');
const { handlePUTrequest } = require('./controllers/handlePUTrequest');

function noResponse(req, res, reqUrl) {
    res.writeHead(404);
    res.write('Data not found. Not valid URL path.');
    res.end();
}

module.exports = { handleGETrequest, handlePOSTrequest, handlePUTrequest, handleDELETErequest, noResponse};