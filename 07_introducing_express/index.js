// 07 basic of express
let express = require('express')
let http = require('http')
let app = express().use((request, response, next) => {
    response.end('Hello, World!')
})

// http.createServer(app).listen(3000)

app = express().use((request, response, next) => {
    response.end('Hello, World!')
})
// app.listen(3000)

let serveStatic = require('serve-static')

app = express().use(serveStatic(__dirname + '/public'))
// app.listen(3000)

// 07 popular connect/expressjs middleware > serving static pages
app = express().use(serveStatic(__dirname + '/public', {
    'index': ['index.html', 'index.htm']
}))
// app.listen(3000)

app = express().use(express.static(__dirname + '/public', {
    'index': ['index.html', 'index.htm']
}))
// app.listen(3000)

// 07 popular connect/expressjs middleware > listing directory contents
let serveIndex = require('serve-index')

app = express().use(express.static(__dirname + '/public'))
app.use(serveIndex(__dirname + '/public'))
// app.listen(3000)

// 07 popular connect/expressjs middleware > accepting json requests and html form inputs
let bodyParser = require('body-parser')

app = express().use(bodyParser.urlencoded({
    extended: true
})).use(bodyParser.json({
    limit: '1mb'
}))
app.use((request, response) => {
    if (request.body.foo) {
        response.end(`Value of foo: ${request.body.foo}`)
    } else {
        response.end('Body does not have foo!')
    }
})
app.use((error, request, response, next) => {
    response.end('Invalid body!')
})
// app.listen(3000)

// 07 popular connect/expressjs middleware > handling cookies
app = express().use((request, response) => {
    response.cookie('name', 'foo')
    response.end('Hello, World!')
})
// app.listen(3000)

app = express().use((request, response) => {
    console.log(`Client request cookies header:\n${request.headers['cookie']}`)

    response.cookie('name', 'foo')
    response.end('Hello, World!')
})
// app.listen(3000)

let cookieParser = require('cookie-parser')

app = express().use(cookieParser())
app.use((request, response) => {
    console.log(request.cookies)
    if (request.cookies.name) {
        console.log(`User name: ${request.cookies.name}`)
    } else {
        response.cookie('name', 'foo')
    }
    response.end('Hello, World!')
})
// app.listen(3000)

app = express().use(cookieParser())
app.use('/toogle', (request, response) => {
    console.log(request.headers)
    if (request.cookies.name) {
        response.clearCookie('name')
        response.end(`Cookie cleared: ${request.cookies.name}`)
    } else {
        response.cookie('name', 'foo')
        response.end('Cookie set')
    }
})
// app.listen(3000)

// 07 popular connect/expressjs middleware > handling cookies > preventing cookie user modification using signing
app = express().use(cookieParser('my super secret sign key'))
app.use('/toogle', (request, response) => {
    if (request.signedCookies.name) {
        response.clearCookie('name')
        response.end(`Cookie cleared: ${request.signedCookies.name}`)
    } else {
        response.cookie('name', 'foo', {
            signed: true
        })
        response.end('Cookie set')
    }
})
// app.listen(3000)

// 07 popular connect/expressjs middleware > handling cookies > httponly and secure
app = express().use(cookieParser('my super secret sign key'))
app.use('/toogle', (request, response) => {
    if (request.signedCookies.name) {
        response.clearCookie('name')
        response.end(`Cookie cleared: ${request.signedCookies.name}`)
    } else {
        response.cookie('name', 'foo', {
            signed: true,
            httpOnly: true,
            secure: true
        })
        response.end('Cookie set')
    }
})
// app.listen(3000)

// 07 popular connect/expressjs middleware > handling cookies > setting a cookie expiry
app = express().use(cookieParser('my super secret sign key'))
app.use('/toogle', (request, response) => {
    if (request.signedCookies.name) {
        response.clearCookie('name')
        response.end(`Cookie cleared: ${request.signedCookies.name}`)
    } else {
        response.cookie('name', 'foo', {
            signed: true,
            httpOnly: true,
            secure: true,
            maxAge: 10000
        })
        response.end('Cookie set')
    }
})
// app.listen(3000)

// 07 popular connect/expressjs middleware > cookie-based sessions
let cookieSession = require('cookie-session')

app = express().use(cookieSession({
    keys: ['my super secret sign key']
}))
app.use('/home', (request, response) => {
    if (request.session.views) {
        request.session.views++
    } else {
        request.session.views = 1
    }
    response.end(`Total view: ${request.session.views}`)
})
app.use('/reset', (request, response) => {
    delete request.session.views
    response.end('Cleared all your views')
})
// app.listen(3000)

// 07 popular connect/expressjs middleware > compression
let compression = require('compression')

app = express().use(compression())
app.use(express.static(__dirname + '/public'))
// app.listen(3000)

// 07 popular connect/expressjs middleware > time-out hanging requests
let timeout = require('connect-timeout')

app = express().use('/api', timeout(5000),
    (request, response, next) => {

    },
    (error, request, response, next) => {
        if (request.timedout) {
            response.statusCode = 500
            response.end('Request timed out')
        } else {
            next(error)
        }
    })
// app.listen(3000)

// 07 popular connect/expressjs middleware > time-out hanging requests > be careful of the sleeping middleware
app = express().use(timeout(5000))
app.use((request, response, next) => {
    setTimeout(() => {
        next()
    }, 6000);
})
app.use((request, response, next) => {
    response.end('Done')
})
// app.listen(3000)

app = express().use(timeout(5000))
app.use((request, response, next) => {
    setTimeout(() => {
        next()
    }, 6000);
})
app.use((request, response, next) => {
    if (!request.timedout) {
        next()
    }
})
app.use((request, response, next) => {
    response.end('Done')
})
// app.listen(3000)

// 07 express response object
app = express().use((request, response) => {
    response.set('Content-Type', 'text/plain')
    response.set({
        'Content-Length': '13',
        'ETag': '12345'
    })
    response.status(200).end('Hello, World!')
})
// app.listen(3000)

// 07 express request object > url handling
app = express().use('/home', (request, response, next) => {
    console.log(`first: ${request.url}`)
    next()
})
app.use((request, response, next) => {
    console.log(`second: ${request.url}`)
    next()
})
// app.listen(3000)

// 07 express application routes
app = express()
    .all('/', (request, response, next) => {
        response.write('all\n')
        next()
    })
app.get('/', (request, response, next) => {
    response.end('GET')
})
app.put('/', (request, response, next) => {
    response.end('PUT')
})
app.post('/', (request, response, next) => {
    response.end('POST')
})
app.delete('/', (request, response, next) => {
    response.end('DELETE')
})
// app.listen(3000)

// 07 express application routes > creating a route object
app = express()
app.route('/')
    .all((request, response, next) => {
        response.write('all\n')
        next()
    })
    .get((request, response, next) => {
        response.end('GET')
    })
    .put((request, response, next) => {
        response.end('PUT')
    })
    .post((request, response, next) => {
        response.end('POST')
    })
    .delete((request, response, next) => {
        response.end('DELETE')
    })
// app.listen(3000)

// 07 express application routes > a deeper look at the path option
app = express()
app.get('/', (request, response) => {
    response.send('Nothing passed in!')
})
app.get(/^\/[0-9]+$/, (request, response) => {
    response.send('Number!')
})
app.get('/*', (request, response) => {
    response.send('Not a number!')
})
// app.listen(3000)

// 07 express application routes > parameter-based routing
app = express()
app.get('/user/:userId', (request, response) => {
    response.send(`userId is: ${request.params['userId']}`)
})
// app.listen(3000)

app = express()
app.param('userId', (request, response, next, userId) => {
    response.write(`Looking up userId: ${userId}\n`)
    request.user = {
        userId: userId
    }
    next()
})
app.get('/user/:userId', (request, response) => {
    response.end(`userId is: ${JSON.stringify(request.user)}`)
})
// app.listen(3000)

// 07 express application routes > express router object
let items = []
let router = express.Router()

router.use(bodyParser.urlencoded({
    extended: true
})).use(bodyParser.json())
router.route('/')
    .get((request, response, next) => {
        response.send({
            status: 'Items found',
            items: items
        })
    })
    .post((request, response, next) => {
        items.push(request.body)
        response.send({
            status: 'Item added',
            itemId: items.length - 1
        })
    })
    .put((request, response, next) => {
        items = request.body
        response.send({
            status: 'Items replaced'
        })
    })
    .delete((request, response, next) => {
        items = []
        response.send({
            status: 'Items cleared'
        })
    })

router.route('/:id')
    .get((request, response, next) => {
        let id = request.params['id']

        if (id && items[Number(id)]) {
            response.send({
                status: 'Item found',
                item: items[Number(id)]
            })
        } else {
            response.send(404, {
                status: 'Not found'
            })
        }
    })
    .all((request, response, next) => {
        response.send(501, {
            status: 'Not implemented'
        })
    })

app = express().use('/todo', router)
app.listen(3000)
console.log('Server running at http://127.0.0.1:3000')
