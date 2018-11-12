var mosca = require('mosca');
var cloudClient = require('./cloud.js');
var settings = { port:1883 }

var server = new mosca.Server(settings);

// Accepts the connection if the username and password are valid
var authenticate = function(client, username, password, callback) {
  var authorized = (username === 'device_1' && password.toString() === 'soilsense_secret');
  if (authorized) client.user = username;
  callback(null, authorized);
}

// fired when a message is published
server.on('published', function(packet, client) {
  if (packet.topic === 'events') {
    var payload = packet.payload.toString('utf8');
    console.log('Published to events: ', payload);
    // relay to google IoT
    cloudClient.publishAsync(payload);
  }
});

// fired when client subscribed
server.on('clientConnected', function(client) {
  console.log ('client ' + client + ' connected')
});

// fired when client subscribed
server.on('clientDisconnected', function(client) {
  console.log ('client ' + client + ' disconnected')
});

function setup() {
  server.authenticate = authenticate;
}

server.on('ready', setup);
