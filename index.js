const SerialPort = require('serialport');
const port = new SerialPort( 'COM1',{
	baudRate: 9600,
  });


const Readline = SerialPort.parsers.Readline;
const parser = port.pipe(new Readline({ delimiter: '\r\n' }));

const express = require("express");
const socketIo = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
      origin: '*',
    }
  });
var pesoAux = 0;
 
server.listen(3001, () => {
    console.log('Servidor online na porta:', server.address().port);
});

port.write('open', function() {
	setInterval(() => write(),1000)
	
});


function write(){

	let _random = (Math.random() + 1).toString(10).substring(0, 8).replace(/(\d{1})?(\d{8})/, "$1.$2");
	console.log(_random);
	port.write(_random, function(err) {
			
		if (err) {
		return console.log('Error on write: ', err.message);
		}
		console.log('enviado');
	})
}



  function rand() {
	return (Math.random(0.500) + 1).toString(10).substring(5)
  }


