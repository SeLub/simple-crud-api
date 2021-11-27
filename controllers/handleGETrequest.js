import { findAllPersons, findPersonById } from '../models.js';
import { validate } from 'uuid';


const handleGETrequest = (req, res, reqUrl) => {

    let message = '', statusCode = 0;

if (reqUrl.searchParams.has('id')) {

    let personId = reqUrl.searchParams.get('id');

    if (validate(personId)) { 

        if (findPersonById(personId)) {

            statusCode = 200;
            message = findPersonById(personId);
            res.setHeader("Content-Type", "application/json");

        } else {

        statusCode = 404; 
        message = 'Person with id: ' + reqUrl.searchParams.get('id') + ' not found in DB.';
        res.setHeader("Content-Type", "text/plain");

        }       


    } else { 

        statusCode = 400; 
        message = 'id: ' + reqUrl.searchParams.get('id') + ' is not valid uuid.';
        res.setHeader("Content-Type", "text/plain");

    }

} else { 

    statusCode = 200; 
    message = findAllPersons(); 
    res.setHeader("Content-Type", "application/json");
}

    res.writeHead(statusCode);
    res.write(message);
    res.end();

}

export { handleGETrequest } ;