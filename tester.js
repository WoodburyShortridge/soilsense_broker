var mqtt = require('mqtt');
var broker = 'localhost'

var options = {
    username: 'device_1',
    password: 'soilsense_secret',
};

var client  = mqtt.connect('mqtt://' + broker, options);
client.on('connect', function () {
  setInterval(function() {
    client.publish('events', 'Hi jesper.');
    console.log('Message Sent');
  }, 5000);
});
