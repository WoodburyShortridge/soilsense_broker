var mqtt = require('mqtt');
var broker = '35.230.163.5'

var options = {
    username: 'device_1',
    password: 'soilsense_secret',
};

var client  = mqtt.connect('mqtt://' + broker, options);
client.on('connect', function () {
  setInterval(function() {
    client.publish('events', 'Hi jesper you crazy avacado.');
    console.log('Message Sent');
  }, 5000);
});
