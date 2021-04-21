'use strict'

const express = require('express')
const btoa = require('btoa');
const app = express()
const server = require('http').createServer(app)


app.get('/opex/login', (req, res) => {
    res.redirect('http://localhost:3000/dmp/#/login?username='+ btoa('Duong'));
})



app.use((req, res) => {
    res.sendStatus(403);
});





// Start server
const port = process.env.PORT || 8080
server.listen(port, function () {
    console.log('Express server listening on port %d in %s mode', port, app.get('env'))
})