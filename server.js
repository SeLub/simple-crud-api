import {} from 'dotenv/config';
import * as http from 'http';
import { handleGETrequest, handlePOSTrequest, handlePUTrequest, handleDELETErequest, noResponse} from './controllers.js';

const { PORT } = process.env || 3000;

console.log(PORT)

let server = http.createServer((req, res) => {

	const isIdinReq = (pathname) => { return pathname.split('/').length >=3 && pathname.split('/').at(-1) !== '' ? true : false }

    const removeLastLetter = (str, endWith) => { if (str.endsWith(endWith)) { return str.substring(0, str.length - 1); } return str; }

    let reqUrl = new URL(req.url, 'http://127.0.0.1/');

    if (isIdinReq(reqUrl.pathname)) {

    	let splittedPath = reqUrl.pathname.split('/');

    	reqUrl.search = new URLSearchParams({ id : splittedPath[2] });

    	let cleanPathname = '/' + splittedPath[1]

        reqUrl.pathname = cleanPathname;
    }

    reqUrl.pathname = removeLastLetter( reqUrl.pathname, '/' );
    
     let router = {
        'GET/person': handleGETrequest,
        'POST/person': handlePOSTrequest,
        'PUT/person': handlePUTrequest,
        'DELETE/person': handleDELETErequest,
        'default': noResponse
    };

    let redirectedFunc = router[req.method + reqUrl.pathname] || router['default'];

    redirectedFunc(req, res, reqUrl);

}).listen(PORT, () => { console.log(`Server is running at ${PORT}`); });

export default server;