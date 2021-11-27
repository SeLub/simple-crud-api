import { deletePerson, findPersonById } from '../models.js';
import { validate } from 'uuid';


const handleDELETErequest = (req, res, reqUrl) => {

    let message = '', statusCode = 0;

if (reqUrl.searchParams.has('id')) {

    let personId = reqUrl.searchParams.get('id');

    if (validate(personId)) { 

        if (findPersonById(personId)) {

            statusCode = 204;

            message = deletePerson(personId) ? `Record with id=${personId} has been deleted.` : 'Some error in deletePerson function.';
             
        } else {

        statusCode = 404; 

        message = 'Person with id: ' + reqUrl.searchParams.get('id') + ' not found.';

        };

    } else { 

        statusCode = 400;
        
        message = 'id: ' + reqUrl.searchParams.get('id') + ' is not valid uuid.';

    }

} else { 

    statusCode = 500; 

    message = 'Your request has not mandatory data: id.';
}

    res.writeHead(statusCode);
    res.write(message);
    res.end();

}

export { handleDELETErequest };
