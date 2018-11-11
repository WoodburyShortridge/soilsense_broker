var mosca = require('mosca');
var mqtt = require('mqtt');

var cloudClient = require('./cloud.js');

var settings = { port:1883 }
var broker = 'localhost'

var server = new mosca.Server(settings);

var brokerClient  = mqtt.connect('mqtt://' + broker);

brokerClient.on('connect', function () {
    brokerClient.subscribe('events')
})
brokerClient.on('message', function (topic, message) {
  context = message.toString();
  console.log(context)
  cloudClient.publishAsync(1, 1);
})

server.on('ready', function(){
  console.log("broker listening");
});
