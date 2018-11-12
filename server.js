var mosca = require('mosca');
var mqtt = require('mqtt');

var cloudClient = require('./cloud.js');

var settings = { port:1883 }
var broker = '35.230.163.5'

var server = new mosca.Server(settings);

var brokerClient  = mqtt.connect('mqtt://' + broker);

brokerClient.on('connect', function () {
    console.log('connected to events');
    brokerClient.subscribe('events')
})
brokerClient.on('message', function (topic, message) {
  context = message.toString();
  console.log(context)
  cloudClient.publishAsync(context);
})

server.on('ready', function(){
  console.log("broker listening");
});
