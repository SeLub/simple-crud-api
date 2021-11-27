import { createPerson } from '../models.js';
import { validate } from 'uuid';

function handlePOSTrequest(req, res, reqUrl) {

    let message = '', statusCode = 0;

    if (reqUrl.searchParams.has('id')) {
    
        statusCode = 500;
        message = 'Wrong URL.';

        res.writeHead(statusCode);
        res.write(message);
        res.end();
    
    } else { 
    
        let body = '';
        req.on('data', function (chank) {
                            body += chank;
                                if (body.length > 1e6) { req.connection.destroy() }
                            });
    
           
        req.on('end', function () {
    
                            let jsonBody = JSON.parse(body);

                            if ((jsonBody.name && jsonBody.age && jsonBody.hobbies) !== undefined) {
                                    
                                let newPerson = createPerson(jsonBody.name, jsonBody.age, jsonBody.hobbies);
                                    
                                statusCode = 201;                                    
                                message = JSON.stringify(newPerson.data);
                                res.setHeader("Content-Type", "application/json");
                            
                            }else { 
                                
                                statusCode = 400;
                                message = 'Your request has not mandatory data: name, age or hobbies.';
                                res.setHeader("Content-Type", "text/plain");
                            };
                            
                            res.writeHead(statusCode);
                            res.write(message);
                            res.end();
                            
                            });
    
    };
};

export { handlePOSTrequest };