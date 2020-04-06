// 08 mongodb using node.js
let mongoClient = require('mongodb').MongoClient
let person1 = {
    name: 'John',
    lastName: 'Smith'
}
let findKey = {
    name: 'John'
}

/*
mongoClient.connect('mongodb://127.0.0.1:27017', (err, client) => {
	if (err) {
		throw err;
	}
	console.log('Successfully connected')

	let db = client.db('demo')
	let collection = db.collection('people')
	
	collection.insertOne(person1, (err, docs) => {
		console.log(`Inserted: ${JSON.stringify(docs.ops[0])}`)
		console.log(`Id: ${person1._id}`)
		
		collection.find(findKey).toArray((err, results) => {
			console.log(`Found results: ${JSON.stringify(results)}`)
			
			collection.deleteOne(findKey, (err, results) => {
				console.log('Deleted person')
				
				client.close()
			})
		})
	})
})
*/

// 08 mongodb using node.js > update a document
/*
mongoClient.connect('mongodb://127.0.0.1:27017', (err, client) => {
	if (err) {
		throw err;
	}
	console.log('Successfully connected')

	let db = client.db('demo')
	let collection = db.collection('people')
	
	collection.insertOne(person1, (err, docs) => {
		console.log(`Inserted: ${JSON.stringify(docs.ops[0])}`)
		console.log(`Id: ${person1._id}`)
		
		collection.updateOne(person1, {
			$set: { lastName: 'Martin' }
		}, (err, result) => {
			console.log('Updated')
			
			collection.find(findKey).toArray((err, results) => {
				console.log(`Found results: ${JSON.stringify(results)}`)
				
				collection.drop(() => {
					client.close()
				})
			})
		})
	})
})
*/

// 08 mongodb using node.js > update operators
let website = {
    url: 'https://www.google.com',
    visits: 0
}

findKey = {
    url: 'https://www.google.com'
}
/*
mongoClient.connect('mongodb://127.0.0.1:27017', (err, client) => {
	if (err) {
		console.log(null !== err)

		throw err
	}
	console.log(null === err)
	
	let db = client.db('demo')
	let collection = db.collection('websites')
	
	collection.insertOne(website, (err, docs) => {
		console.log(null === err)
		console.log(1 === docs.result.n)
		console.log(1 === docs.ops.length)
		
		let done = 0
		
		function onDone(err) {
			if (++done < 4) {
				return
			}
			
			collection.find(findKey).toArray((err, results) => {
				console.log(null === err)
				console.log(`Visits: ${JSON.stringify(results[0].visits)}`)
				
				collection.drop(() => {
					client.close()
				})
			})
		}
		
		let incrementVisits = { '$inc': { 'visits': 1 } }
		
		collection.updateOne(findKey, incrementVisits, onDone)
		collection.updateOne(findKey, incrementVisits, onDone)
		collection.updateOne(findKey, incrementVisits, onDone)
		collection.updateOne(findKey, incrementVisits, onDone)
	})
})
*/

// 08 mongoose odm > connecting to mongodb
let mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/demo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

let db = mongoose.connection

/*
db.on('error', (err) => {
	throw err
})
db.once('open', function callback() {
	console.log('Connected!')
	
	db.close()
})
*/

// 08 mongoose odm > mongoose schema and model
/*
let tankSchema = new mongoose.Schema({ name: 'string', size: 'string' })

tankSchema.methods.print = function() {
	return `I am ${this.name} the ${this.size}`
}

let tank = mongoose.model('Tank', tankSchema)
let panther = new tank({ name: 'Panther', size: 'medium' })
*/

// console.log('I am Panther the medium' === panther.print())

/*
panther.save((err) => {
	if (err) {
		throw err
	}
})

tank.findOne({ name: 'Panther' }).exec((err, tank) => {
	console.log('I am Panther the medium' === panther.print())
})
*/

/*
tankSchema = new mongoose.Schema({ name: 'string', size: 'string' })
tankSchema.methods.print = function() {
	return `I am ${this.name} the ${this.size}`
}
tank = mongoose.model('Tank', tankSchema)
mongoose.connect('mongodb://127.0.0.1:27017/demo', { useNewUrlParser: true, useUnifiedTopology: true })
db = mongoose.connection
db.once('open', function callback() {
	console.log(`Connected!`)
	
	panther = new tank({ name: 'Panther', size: 'medium' })
	console.log('I am Panther the medium' === panther.print())
	
	panther.save((err) => {
		tank.findOne({ name: 'Panther' }).exec((err, tank) => {
			console.log('I am Panther the medium' === tank.print())
			
			let collection = db.collection('tanks')
			
			collection.drop(() => {
				db.close()
			})
		})
	})
})
*/

// 08 using a mongodb as a distributed session store
let express = require('express')
let expressSession = require('express-session')
let app = express().use(expressSession({
    secret: 'my super secret sign key',
    resave: false,
    saveUninitialized: true
}))

app.set('trust proxy', 1)
app.use('/home', (request, response) => {
    if (request.session.views) {
        request.session.views++
    } else {
        request.session.views = 1
    }
    response.end(`Views: ${request.session.views}`)
})
app.use('/reset', (request, response) => {
    delete request.session.views
    response.end('Cleared all your views')
})
// app.listen(3000)

let MongoStore = require('connect-mongo')(expressSession)
let sessionStore = new MongoStore({
    host: '127.0.0.1',
    port: '27017',
    db: 'session',
    url: 'mongodb://127.0.0.1:27017/demo'
})

app = express().use(expressSession({
    secret: 'my super secret sign key',
    resave: false,
    saveUninitialized: true,
    store: sessionStore
}))
app.use('/home', (request, response) => {
    if (request.session.views) {
        request.session.views++
    } else {
        request.session.views = 1
    }
    response.end(`Views: ${request.session.views}`)
})
app.use('/reset', (request, response) => {
    delete request.session.views
    response.end('Cleared all your views')
})
// app.listen(3000)
console.log('Server running at http://127.0.0.1:3000')
