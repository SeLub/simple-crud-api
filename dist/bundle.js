import { createRequire as __WEBPACK_EXTERNAL_createRequire } from "module";
/******/ var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* @flow */

(function () {
  (__webpack_require__(2).config)(
    Object.assign(
      {},
      __webpack_require__(6),
      __webpack_require__(7)(process.argv)
    )
  )
})()


/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* @flow */
/*::

type DotenvParseOptions = {
  debug?: boolean
}

// keys and values from src
type DotenvParseOutput = { [string]: string }

type DotenvConfigOptions = {
  path?: string, // path to .env file
  encoding?: string, // encoding of .env file
  debug?: string // turn on logging for debugging purposes
}

type DotenvConfigOutput = {
  parsed?: DotenvParseOutput,
  error?: Error
}

*/

const fs = __webpack_require__(3)
const path = __webpack_require__(4)
const os = __webpack_require__(5)

function log (message /*: string */) {
  console.log(`[dotenv][DEBUG] ${message}`)
}

const NEWLINE = '\n'
const RE_INI_KEY_VAL = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/
const RE_NEWLINES = /\\n/g
const NEWLINES_MATCH = /\r\n|\n|\r/

// Parses src into an Object
function parse (src /*: string | Buffer */, options /*: ?DotenvParseOptions */) /*: DotenvParseOutput */ {
  const debug = Boolean(options && options.debug)
  const obj = {}

  // convert Buffers before splitting into lines and processing
  src.toString().split(NEWLINES_MATCH).forEach(function (line, idx) {
    // matching "KEY' and 'VAL' in 'KEY=VAL'
    const keyValueArr = line.match(RE_INI_KEY_VAL)
    // matched?
    if (keyValueArr != null) {
      const key = keyValueArr[1]
      // default undefined or missing values to empty string
      let val = (keyValueArr[2] || '')
      const end = val.length - 1
      const isDoubleQuoted = val[0] === '"' && val[end] === '"'
      const isSingleQuoted = val[0] === "'" && val[end] === "'"

      // if single or double quoted, remove quotes
      if (isSingleQuoted || isDoubleQuoted) {
        val = val.substring(1, end)

        // if double quoted, expand newlines
        if (isDoubleQuoted) {
          val = val.replace(RE_NEWLINES, NEWLINE)
        }
      } else {
        // remove surrounding whitespace
        val = val.trim()
      }

      obj[key] = val
    } else if (debug) {
      log(`did not match key and value when parsing line ${idx + 1}: ${line}`)
    }
  })

  return obj
}

function resolveHome (envPath) {
  return envPath[0] === '~' ? path.join(os.homedir(), envPath.slice(1)) : envPath
}

// Populates process.env from .env file
function config (options /*: ?DotenvConfigOptions */) /*: DotenvConfigOutput */ {
  let dotenvPath = path.resolve(process.cwd(), '.env')
  let encoding /*: string */ = 'utf8'
  let debug = false

  if (options) {
    if (options.path != null) {
      dotenvPath = resolveHome(options.path)
    }
    if (options.encoding != null) {
      encoding = options.encoding
    }
    if (options.debug != null) {
      debug = true
    }
  }

  try {
    // specifying an encoding returns a string instead of a buffer
    const parsed = parse(fs.readFileSync(dotenvPath, { encoding }), { debug })

    Object.keys(parsed).forEach(function (key) {
      if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
        process.env[key] = parsed[key]
      } else if (debug) {
        log(`"${key}" is already defined in \`process.env\` and will not be overwritten`)
      }
    })

    return { parsed }
  } catch (e) {
    return { error: e }
  }
}

module.exports.config = config
module.exports.parse = parse


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("fs");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("path");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("os");

/***/ }),
/* 6 */
/***/ ((module) => {

/* @flow */

// ../config.js accepts options via environment variables
const options = {}

if (process.env.DOTENV_CONFIG_ENCODING != null) {
  options.encoding = process.env.DOTENV_CONFIG_ENCODING
}

if (process.env.DOTENV_CONFIG_PATH != null) {
  options.path = process.env.DOTENV_CONFIG_PATH
}

if (process.env.DOTENV_CONFIG_DEBUG != null) {
  options.debug = process.env.DOTENV_CONFIG_DEBUG
}

module.exports = options


/***/ }),
/* 7 */
/***/ ((module) => {

/* @flow */

const re = /^dotenv_config_(encoding|path|debug)=(.+)$/

module.exports = function optionMatcher (args /*: Array<string> */) {
  return args.reduce(function (acc, cur) {
    const matches = cur.match(re)
    if (matches) {
      acc[matches[1]] = matches[2]
    }
    return acc
  }, {})
}


/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("http");

/***/ }),
/* 9 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handleGETrequest": () => (/* reexport safe */ _controllers_handleGETrequest_js__WEBPACK_IMPORTED_MODULE_0__.handleGETrequest),
/* harmony export */   "handlePOSTrequest": () => (/* reexport safe */ _controllers_handlePOSTrequest_js__WEBPACK_IMPORTED_MODULE_2__.handlePOSTrequest),
/* harmony export */   "handlePUTrequest": () => (/* reexport safe */ _controllers_handlePUTrequest_js__WEBPACK_IMPORTED_MODULE_3__.handlePUTrequest),
/* harmony export */   "handleDELETErequest": () => (/* reexport safe */ _controllers_handleDELETErequest_js__WEBPACK_IMPORTED_MODULE_1__.handleDELETErequest),
/* harmony export */   "noResponse": () => (/* binding */ noResponse)
/* harmony export */ });
/* harmony import */ var _controllers_handleGETrequest_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _controllers_handleDELETErequest_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18);
/* harmony import */ var _controllers_handlePOSTrequest_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(19);
/* harmony import */ var _controllers_handlePUTrequest_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);






function noResponse(req, res, reqUrl) {
    res.writeHead(404);
    res.write('Data not found. Not valid URL path.');
    res.end();
}



/***/ }),
/* 10 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handleGETrequest": () => (/* binding */ handleGETrequest)
/* harmony export */ });
/* harmony import */ var _models_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16);




const handleGETrequest = (req, res, reqUrl) => {

    let message = '', statusCode = 0;

if (reqUrl.searchParams.has('id')) {

    let personId = reqUrl.searchParams.get('id');

    if ((0,uuid__WEBPACK_IMPORTED_MODULE_1__["default"])(personId)) { 

        if ((0,_models_js__WEBPACK_IMPORTED_MODULE_0__.findPersonById)(personId)) {

            statusCode = 200;
            message = (0,_models_js__WEBPACK_IMPORTED_MODULE_0__.findPersonById)(personId);

        } else {

        statusCode = 404; 
        message = 'Person with id: ' + reqUrl.searchParams.get('id') + ' not found in DB.';

        }       


    } else { 

        statusCode = 400; 
        message = 'id: ' + reqUrl.searchParams.get('id') + ' is not valid uuid.';

    }

} else { 

    statusCode = 200; 

    message = (0,_models_js__WEBPACK_IMPORTED_MODULE_0__.findAllPersons)(); 
}

    res.writeHead(statusCode);
    res.write(message);
    res.end();

}



/***/ }),
/* 11 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "findAllPersons": () => (/* binding */ findAllPersons),
/* harmony export */   "findPersonById": () => (/* binding */ findPersonById),
/* harmony export */   "createPerson": () => (/* binding */ createPerson),
/* harmony export */   "updatePerson": () => (/* binding */ updatePerson),
/* harmony export */   "deletePerson": () => (/* binding */ deletePerson)
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);


const personsDB = [
{
	id : '89da7309-e5ed-48a4-b4e6-ae47c947ae12',
	name : 'Sergey Lubimov',
	age: 27,
	hobbies : ['swimming','coding','dancing']
}
]

const arrayEquals = (a, b) => { return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((val, index) => val === b[index]); }

const findAllPersons = (array = personsDB) => JSON.stringify(array);

const findPersonById = (id, array = personsDB) => {

	let obj = array.find(o => o.id === id);

	return obj ? JSON.stringify(obj) : undefined;
};

const createPerson = (name, age, hobbies, array = personsDB) =>{

		let newPerson = {'id': (0,uuid__WEBPACK_IMPORTED_MODULE_0__["default"])(), 'name' : name, 'age': age, 'hobbies': hobbies};

		array.push(newPerson);
		
		return { resault: true, data: newPerson};

};

const updatePerson = (id, name, age, hobbies, array = personsDB) =>{

	let obj = array.find(x => x.id === id);
	
	let index = array.indexOf(obj);

		if (name !== obj.name) { obj.name = name };
		if (age !== obj.age) { obj.age = age };
		if (!arrayEquals(hobbies, obj.hobbies)) { obj.hobbies = hobbies }

return array[index];
};

const deletePerson = (id, array = personsDB) =>{

	let obj = array.find(x => x.id === id);
	
	let index = array.indexOf(obj);

	array.splice(index,1);

return true;
};



/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);



function v4(options, buf, offset) {
  options = options || {};
  const rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_1__["default"])(rnds);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rng)
/* harmony export */ });
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_0__);

const rnds8Pool = new Uint8Array(256); // # of random values to pre-allocate

let poolPtr = rnds8Pool.length;
function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    crypto__WEBPACK_IMPORTED_MODULE_0___default().randomFillSync(rnds8Pool);
    poolPtr = 0;
  }

  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}

/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("crypto");

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  const uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17);


function validate(uuid) {
  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

/***/ }),
/* 18 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handleDELETErequest": () => (/* binding */ handleDELETErequest)
/* harmony export */ });
/* harmony import */ var _models_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16);




const handleDELETErequest = (req, res, reqUrl) => {

    let message = '', statusCode = 0;

if (reqUrl.searchParams.has('id')) {

    let personId = reqUrl.searchParams.get('id');

    if ((0,uuid__WEBPACK_IMPORTED_MODULE_1__["default"])(personId)) { 

        if ((0,_models_js__WEBPACK_IMPORTED_MODULE_0__.findPersonById)(personId)) {

            statusCode = 204;

            message = (0,_models_js__WEBPACK_IMPORTED_MODULE_0__.deletePerson)(personId) ? `Record with id=${personId} has been deleted.` : 'Some error in deletePerson function.';
             
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




/***/ }),
/* 19 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handlePOSTrequest": () => (/* binding */ handlePOSTrequest)
/* harmony export */ });
/* harmony import */ var _models_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);



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
                                    
                                let newPerson = (0,_models_js__WEBPACK_IMPORTED_MODULE_0__.createPerson)(jsonBody.name, jsonBody.age, jsonBody.hobbies);
                                    
                                statusCode = 201;
                                    
                                message = JSON.stringify(newPerson.data);
                            
                            }else { 
                                
                                statusCode = 400;

                                message = 'Your request has not mandatory data: name, age or hobbies.'};
                            
                            res.writeHead(statusCode);
                            res.write(message);
                            res.end();
                            
                            });
    
    };
};



/***/ }),
/* 20 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handlePUTrequest": () => (/* binding */ handlePUTrequest)
/* harmony export */ });
/* harmony import */ var _models_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16);




const handlePUTrequest = (req, res, reqUrl) => {

	let message = '', statusCode = 200;


	if (reqUrl.searchParams.has('id')) {
	
	    let personId = reqUrl.searchParams.get('id');
	
	    if ((0,uuid__WEBPACK_IMPORTED_MODULE_1__["default"])(personId)) { 
	
	        if ((0,_models_js__WEBPACK_IMPORTED_MODULE_0__.findPersonById)(personId)) {

	        	let body = '';
        				
        		req.on('data', function (chank) {
                    body += chank;
                    if (body.length > 1e6) { req.connection.destroy() }
                });

        		req.on('end', function () {
    
                    let jsonBody = JSON.parse(body);

                    const { name, age, hobbies } = jsonBody;

                    let updatedPerson = (0,_models_js__WEBPACK_IMPORTED_MODULE_0__.updatePerson)(personId, name, age, hobbies);

                    statusCode = 200;

                    message = JSON.stringify(updatedPerson);

                    res.writeHead(statusCode);
        			res.write(message);
        			res.end();

                });


	        } else {
	
	        statusCode = 404; 
	        message = 'Person with id: ' + reqUrl.searchParams.get('id') + ' not found.';

	        res.writeHead(statusCode);
        	res.write(message);
        	res.end();
	
	        };
	
	
	    } else { 
	
	        statusCode = 400; 
	        message = 'id: ' + reqUrl.searchParams.get('id') + ' is not valid uuid.';

	        res.writeHead(statusCode);
        	res.write(message);
        	res.end();
	
	    }
	
	} else { 
	
	    statusCode = 500; 
	
	    message = 'Your request has not mandatory data: id.';

	    res.writeHead(statusCode);
        res.write(message);
        res.end();
	}

}



/***/ })
/******/ ]);
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/compat get default export */
/******/ (() => {
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		var getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var dotenv_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _controllers_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);




const { PORT } = process.env || 3000;

console.log(PORT)

http__WEBPACK_IMPORTED_MODULE_1__.createServer((req, res) => {

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
        'GET/person': _controllers_js__WEBPACK_IMPORTED_MODULE_2__.handleGETrequest,
        'POST/person': _controllers_js__WEBPACK_IMPORTED_MODULE_2__.handlePOSTrequest,
        'PUT/person': _controllers_js__WEBPACK_IMPORTED_MODULE_2__.handlePUTrequest,
        'DELETE/person': _controllers_js__WEBPACK_IMPORTED_MODULE_2__.handleDELETErequest,
        'default': _controllers_js__WEBPACK_IMPORTED_MODULE_2__.noResponse
    };

    let redirectedFunc = router[req.method + reqUrl.pathname] || router['default'];

    redirectedFunc(req, res, reqUrl);

}).listen(PORT, () => { console.log(`Server is running at ${PORT}`); });

})();

