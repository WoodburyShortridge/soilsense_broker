var mqtt = require('mqtt');
var broker = 'localhost'

var client  = mqtt.connect('mqtt://' + broker);
client.on('connect', function () {
  setInterval(function() {
    client.publish('events', 'Hello mqtt');
    console.log('Message Sent');
  }, 5000);
});
