function _1() {
    const express = require('express');
    const hostname = '127.0.0.1';
    const port = 3000;
    let app = express();

    app.get('/flag/:flag', (req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');

        if ('yes' === req.params['flag']) {
            res.end('Hello, World!');
        } else {
            throw new Error('An error occurred.');
        }
    });

    app.listen(port);

    console.log(`Server running at http://${hostname}:${port}/`);
}

function _2() {
    const cluster = require('cluster');

    if (cluster.isMaster) {
        console.log('Starting a worker');

        cluster.fork();
    } else {
        console.log('Worker started');
        process.exit();
    }
}

function _3() {
    const cluster = require('cluster');
    const numCPUs = require('os').cpus().length;

    if (cluster.isMaster) {
        for (let i = 0; i < numCPUs; i++) {
            console.log('Starting a worker');

            cluster.fork();
        }

        cluster.on('exit', (worker, code, signal) => {
            console.log(`Worker ${worker.process.pid} exited`);
        });
    } else {
        console.log('Worker started');

        process.exit();
    }
}

function _4() {
    const cluster = require('cluster');
    const numCPUs = require('os').cpus().length;

    if (cluster.isMaster) {
        for (let i = 0; i < numCPUs; i++) {
            const worker = cluster.fork();

            console.log(`Starting a worker with PID ${worker.process.pid}`);
        }

        cluster.on('exit', (worker, code, signal) => {
            console.log(`Worker ${worker.process.pid} exited`);
        });
    } else {
        const express = require('express');
        const hostname = '127.0.0.1';
        const port = 3000;
        let app = express();

        app.get('/', (req, res, next) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end(`Hello world from worker with PID ${cluster.worker.process.pid}`);
        });

        app.listen(port);
    }
}

function _5() {
    const cluster = require('cluster');

    if (cluster.isMaster) {
        const worker = cluster.fork();

        worker.on('message', (msg) => {
            console.log(`Message received from worker: ${msg}`);
        });
    } else {
        console.log(`Worker with PID ${cluster.worker.process.pid} started`);

        process.send('Hello, World!');
        process.exit();
    }
}

(function () {
    // 13 deployment and scalability > ensuring uptime
    // _1();

    // 13 deployment and scalability > node.js clustering > spawning workers
    // _2();

    // 13 deployment and scalability > node.js clustering > the ideal worker count
    // _3();

    // 13 deployment and scalability > node.js clustering > handling http requests in workers
    // _4();

    // 13 deployment and scalability > node.js clustering > communicating with the master
    // _5();
}());
