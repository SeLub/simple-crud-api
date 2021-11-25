
import { handleGETrequest } from './controllers/handleGETrequest.js';
import { handleDELETErequest } from './controllers/handleDELETErequest.js';
import { handlePOSTrequest } from './controllers/handlePOSTrequest.js';
import { handlePUTrequest } from './controllers/handlePUTrequest.js';

function noResponse(req, res, reqUrl) {
    res.writeHead(404);
    res.write('Data not found. Not valid URL path.');
    res.end();
}

export { handleGETrequest, handlePOSTrequest, handlePUTrequest, handleDELETErequest, noResponse};