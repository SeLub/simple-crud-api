const http = require('http');
require('dotenv').config();
const { findAllPersons, findPersonById, createPerson, updatePerson, deletePerson} = require('./models')

const { PORT } = process.env || 3000;

/** handle GET request */
function handleGETrequest(req, res, reqUrl) {

    res.writeHead(200);
    res.write('GET :\n');
    res.write(reqUrl.searchParams ? 'Persons id: ' + reqUrl.searchParams : 'List of all persons');
    res.end();
}

function handlePOSTrequest(req, res, reqUrl) {

    res.writeHead(200);
    res.write('POST :\n');
    res.write(reqUrl.searchParams ? 'Persons id: ' + reqUrl.searchParams : 'List of all persons');
    res.end();
}

function handlePUTrequest(req, res, reqUrl) {

    res.writeHead(200);
    res.write('PUT :\n');
    res.write(reqUrl.searchParams ? 'Persons id: ' + reqUrl.searchParams : 'List of all persons');
    res.end();
}


function handleDELETErequest(req, res, reqUrl) {

    res.writeHead(200);
    res.write('DELETE :\n');
    res.write(reqUrl.searchParams ? 'Persons id: ' + reqUrl.searchParams : 'List of all persons');
    res.end();
}


/** handle POST request */
function postHandler(req, res, reqUrl) {
    req.setEncoding('utf8');
    req.on('data', (chunk) => {
        res.writeHead(200);
        res.write('POST parameters: ' + chunk);
        res.end();
    });
}

/** if there is no related function which handles the request, then show error message */
function noResponse(req, res, reqUrl) {
    res.writeHead(404);
    res.write('noResponse');
    res.write(reqUrl.searchParams ? 'Persons id: ' + reqUrl.searchParams : 'List of all persons');
    //res.write('Method: ', req.method);
    res.end();
}

http.createServer((req, res) => {

	const isIdinReq = (pathname) => { return pathname.split('/').length >=3 && pathname.split('/').at(-1) !== '' ? true : false }

    // create an object for all redirection options

    let reqUrl = new URL(req.url, 'http://127.0.0.1/');

    console.log('req.url = ', req.url)
    console.log('reqUrl', reqUrl)

    
    if (isIdinReq(reqUrl.pathname)) {



    	let splittedPath = reqUrl.pathname.split('/');

    	reqUrl.search = new URLSearchParams({ id : splittedPath[2] });

    	let cleanPathname = '/' + splittedPath[1]

    	// console.log(cleanPathname, ' id =', splittedPath[2]);

        // console.log('reqUrl.search = ', reqUrl.search)

        reqUrl.pathname = cleanPathname;
    }

    console.log('reqUrl', reqUrl)


    //     console.log('req.pathname = ', req.pathname)
    //     console.log('req.method = ', req.method )
    //     console.log('reqUrl.searchParams = ', reqUrl.searchParams )
    
     let router = {
        'GET/person': handleGETrequest,
        'POST/person': handlePOSTrequest,
        'PUT/person': handlePUTrequest,
        'DELETE/person': handleDELETErequest,
        'default': noResponse
    };

    redirectedFunc = router[req.method + reqUrl.pathname] || router['default'];

    console.log(router)

  //  console.log(req.url)
    
    redirectedFunc(req, res, reqUrl);
}).listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});
