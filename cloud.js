const mqtt = require('gcic-mqtt-client');
const fs = require('fs');

const options = {
  projectId: "soilsense-system",
  registryId: "soil",
  deviceId: "device_1",
  cloudRegion: 'us-central1',
  privateKey: fs.readFileSync('./rsa_private.pem')
};

const googleClient = mqtt(options);

function publishAsync (data) {
  // Publish an event
  console.log('sending google msg: ' + data)
  googleClient.publishEvent(data);
}

// Publish a state update
// googleClient.publishState(state);
module.exports = { publishAsync };
