// 06 basics of node.js http
let http = require('http')
/*
let server = http.createServer((request, response) => {
	console.log('Request starting...')

	// 06 basics of node.js http > inspecting headers
	// console.log(request.headers)
	// response.statusCode = 200
    // response.setHeader('Content-Type', 'text/plain; charset=UTF-8')
	// response.write('Hello, World!')

	// 06 basics of node.js http > key members of the response stream > send headers only
	// response.writeHead(200, { 'Content-Type': 'text/html' })
	
	// 06 basics of node.js http > key members of the request stream
	// console.log(`user-agent: ${request.headers['user-agent']}`)
	// console.log('GET' === request.method)
	// console.log('/' === request.url)
	
	// 06 creating your own file web server > serving base html
	let fs = require('fs')

	//	if ('GET' === request.method && '/' === request.url) {
	//		response.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' })
	//		fs.readFile('./index.html', (err, data) => {
	//			if (err) {
	//				_404(response)
	//				
	//				return
	//			}
	//
	//			response.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' })
	//			response.write(data)
	//			response.end()
	//		})
	//	} else {
	//		_404(response)
	//	}
	
	// 06 creating your own file web server > serving a directory
	let mimeLookup = {
		'.js': 'application/javascript',
		'.html': 'text/html; charset=UTF-8'
	}
	
	if ('GET' === request.method) {
		let fileurl
		
		if ('/' === request.url) {
			fileurl = './index.html'
		} else {
			fileurl = '.' + request.url
		}

		let path = require('path')
		let mimeType = mimeLookup[path.extname(fileurl)]
		
		if (!mimeType) {
			_404(response)
			
			return
		}
		
		fs.exists(fileurl, (exists) => {
			if (!exists) {
				_404(response)
				
				return
			}
			
			fs.readFile(fileurl, (err, data) => {
				if (err) {
					_404(response)
					
					return
				}

				response.writeHead(200, { 'Content-Type': mimeType })
				response.write(data)
				response.end()
			})
		})
	} else {
		_404(response)
	}
	
	// response.end()
})

server.listen(3000)
*/

// 06 creating your own file web server > serving base html
function _404(response) {
    response.writeHead(404, {
        'Content-Type': 'text/plain'
    })
    response.write('Error 404: Resource not found.')
    response.end()
}

// 06 introducing connect > creating a bare-bones connect application
let connect = require('connect')
let app = connect()

// http.createServer(app).listen(3000)
// app.listen(3000)

// 06 introducing connect > creating a connect middleware
app = connect().use((request, response, next) => {
    next()
})
// app.listen(3000)

let util = require('util')

function logit(request, response, next) {
    util.log(util.format(`Request received: %s, %s`, request.method, request.url))
    next()
}

app = connect().use(logit)
// app.listen(3000)

let echo = function(request, response, next) {
    request.pipe(response)
}

app = connect().use(echo)
// app.listen(3000)

// 06 introducing connect > mounting middleware by path prefix
app = connect().use('/echo', echo)
app.use((request, response) => {
    response.end('Howdy')
})
// app.listen(3000)

// 06 introducing connect > using an object as middleware
echo = {
    handle: function(request, response, next) {
        request.pipe(response)
    }
}
app = connect().use(echo)
// app.listen(3000)

// 06 introducing connect > creating configurable middleware
function greeter(message) {
    return function(request, response, next) {
        response.end(message)
    }
}

let helloGreeter = greeter('Hello, World!')
let heyGreeter = greeter('Hey, World!')

app = connect().use('/hello', helloGreeter)
app.use('/hey', heyGreeter)
// app.listen(3000)

// 06 introducing connect > the power of chaining > sharing request/response information
function parseJSON(request, response, next) {
    if ('application/json' === request.headers['content-type']) {
        let data = ''

        request.on('readable', () => {
            data += request.read()
        })

        request.on('end', () => {
            try {
                request.body = JSON.parse(data)
            } catch (e) {
                console.log(e)
            }
            next()
        })
    } else {
        next()
    }
}

app = connect().use(parseJSON)
app.use((request, response) => {
    if (request.body) {
        response.end(`foo: ${request.body.foo}`)
    } else {
        response.end('No JSON detected')
    }
})
// app.listen(3000)

// 06 introducing connect > the power of chaining > chaining sample: verifying requests/restricting access
function auth(request, response, next) {
    function _401() {
        response.writeHead(401, {
            'WWW-Authenticate': 'Basic'
        })
        response.end()
    }

    let authHeader = request.headers.authorization

    if (!authHeader) {
        _401()

        return
    }

    let auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':')
    let user = auth[0]
    let pass = auth[1]

    if ('foo' === user && 'bar' === pass) {
        next()
    } else {
        _401()
    }
}

app = connect().use((request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/html; charset=UTF-8'
    })
})
app.use('/admin', auth)
app.use('/admin', (request, response) => {
    response.end('Authorized!')
})
app.use((request, response) => {
    response.end('Public')
})
// app.listen(3000)

// 06 introducing connect > the power of chaining > raising a connect error
app = connect().use((request, response, next) => {
    next('An error has occured!')
})
app.use((request, response, next) => {
    response.end('I will never get called.')
})
// app.listen(3000)

app = connect().use((request, response, next) => {
    next(new Error('An error has occured!'))
})
app.use((request, response, next) => {
    response.end('I will never get called.')
})
app.use((error, request, response, next) => {
    console.log(`Error handled: ${error.message}`)
    console.log(`Stackrace: ${error.stack}`)

    response.writeHead(500)
    response.end('Unable to process the request.')
})
// app.listen(3000)

app = connect().use((request, response, next) => {
    next()
})
app.use((error, request, response, next) => {
    response.end('Error occured.')
})
app.use((request, response, next) => {
    response.end('No error.')
})
// app.listen(3000)
// console.log('Server running at http://127.0.0.1:3000')

// 06 https > create an https server
let https = require('https')
let fs = require('fs')
let options = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
}

app = https.createServer(options, (request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/html; charset=UTF-8'
    })
    response.end('Hello, World!')
})
// app.listen(3000)

app = connect().use((request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/html; charset=UTF-8'
    })
    response.end('Hello, World!')
})
// https.createServer(options, app).listen(3000)
// console.log('Server running at https://127.0.0.1:3000')

// 06 https > use https by default
// https.createServer(options, app).listen(443)
/*
http.createServer((request, response) => {
    response.writeHead(301, {
        'Location': 'https://' + request.headers['host'] + request.url
    })
    response.end()
}).listen(80)
*/
// console.log('Server running at https://127.0.0.1:443')
