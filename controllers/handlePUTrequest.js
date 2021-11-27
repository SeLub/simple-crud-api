import { updatePerson, findPersonById } from '../models.js';
import { validate } from 'uuid';


const handlePUTrequest = (req, res, reqUrl) => {

	let message = '', statusCode = 200;


	if (reqUrl.searchParams.has('id')) {
	
	    let personId = reqUrl.searchParams.get('id');
	
	    if (validate(personId)) { 

	    	try {
	
	        	if (findPersonById(personId)) {
	
	        		let body = '';
        					
        			req.on('data', function (chank) {
            	        body += chank;
            	        if (body.length > 1e6) { req.connection.destroy() }
            	    });
	
        			req.on('end', function () {
    	
            	        let jsonBody = JSON.parse(body);
	
            	        const { name, age, hobbies } = jsonBody;
	
            	        let updatedPerson = updatePerson(personId, name, age, hobbies);
	
            	        statusCode = 200;
            	        message = JSON.stringify(updatedPerson);
	
            	        res.setHeader("Content-Type", "application/json");
            	        res.writeHead(statusCode);
        				res.write(message);
        				res.end();
	
            	    });
	
	
	        	} else {
		
	        	statusCode = 404; 
	        	message = 'Person with id: ' + reqUrl.searchParams.get('id') + ' not found.';
	
	        	res.setHeader("Content-Type", "text/plain");
	        	res.writeHead(statusCode);
        		res.write(message);
        		res.end();
		
	        	};
			
			} catch(error){

    			statusCode = 500; 
    			message = error.message;
    			res.setHeader("Content-Type", "text/plain");
    			res.write(message);
        		res.end();

			};
	
	    
	    } else { 
	
	        statusCode = 400; 
	        message = 'id: ' + reqUrl.searchParams.get('id') + ' is not valid uuid.';

	        res.setHeader("Content-Type", "text/plain");
	        res.writeHead(statusCode);
        	res.write(message);
        	res.end();
	
	    }
	
	} else { 
	
	    statusCode = 500; 
	
	    message = 'Your request has not mandatory data: id.';

	    res.setHeader("Content-Type", "text/plain");
	    res.writeHead(statusCode);
        res.write(message);
        res.end();
	}

}

export { handlePUTrequest };