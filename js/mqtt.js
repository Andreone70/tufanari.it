// Create a client instance
client = new Paho.MQTT.Client("212.227.228.163", Number(9001), "pippetto");
client.startTrace();
// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({onSuccess:onConnect});
console.log("attempting to connect...")


// called when the client connects
function onConnect() {
  console.log("Connesso al Server");
  client.subscribe("#")

  //messaggio = '{"result":true, "count":42}';
  //topic = "test";
  //client.send(topic,messaggio, 1 ,false);
  
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("Connessione Persa:"+responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  console.log("Messaggio Arrivato al topic :"+message.destinationName);
  
  if (message.destinationName == 'shellyplusht-c049ef8dfe50/status/temperature:0') {
    j = JSON.parse(message.payloadString);
    consolle.log(j)
    document.getElementById('temperatura').innerText = j.tF
  }

  
  
}