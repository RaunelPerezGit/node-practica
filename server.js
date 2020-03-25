const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.set('port', process.env.PORT || 3000);
const server = require('http').Server(app);
const Router = require('./app/router');
app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
  }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use('',Router);
app.set('view engine', 'pug');


server.listen(app.get('port'),function(){
    console.log('Servidor corriendo en el puerto',app.get('port'));
});

const io = require('socket.io')(server);
require('./app/sockets')(io);