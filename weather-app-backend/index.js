const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const weatherService = require('./services/weatherService');
const weatherRoutes = require('./routes/weatherRoutes');
const config = require('./config/config');
const cron = require('node-cron');

const app = express();

app.use(express.json());
app.use('/api/weather', weatherRoutes); // API routes for HTTP requests

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let clients = [];

// When a client connects to WebSocket
wss.on('connection', (ws) => {
  console.log('Client connected');
  
  let city = 'London'; // Default city
  
  clients.push({ ws, city });

  // Listen for messages from the client to get the city name
  ws.on('message', (message) => {
    const parsedMessage = JSON.parse(message);
    if (parsedMessage.city) {
      city = parsedMessage.city;
      console.log(`Received city from client: ${city}`);
      
      // Update the city for this client
      const clientIndex = clients.findIndex(c => c.ws === ws);
      if (clientIndex > -1) {
        clients[clientIndex].city = city;
      }
    }
  });

  ws.on('close', () => {
    clients = clients.filter(client => client.ws !== ws);
    console.log('Client disconnected');
  });
});

// Push weather data to all connected WebSocket clients
const broadcastWeatherData = (weatherData, city) => {
  clients.forEach((client) => {
    if (client.ws.readyState === WebSocket.OPEN && client.city === city) {
      client.ws.send(JSON.stringify(weatherData));
    }
  });
};

// Periodically fetch weather data for each connected client's city
cron.schedule('*/10 * * * * *', async () => {
  try {
    for (const client of clients) {
      const weatherData = await weatherService.fetchWeatherFromApi(client.city);
      broadcastWeatherData(weatherData, client.city); // Send updates to WebSocket clients
    }
  } catch (error) {
    console.error('Failed to fetch and broadcast weather data:', error.message);
  }
});

// Start the server
const PORT = config.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
