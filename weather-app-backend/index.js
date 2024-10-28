const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const weatherService = require('./services/weatherService');
const weatherRoutes = require('./routes/weatherRoutes');
const config = require('./config/config');
const cron = require('node-cron');

const app = express();

// Middleware to handle JSON payloads
app.use(express.json());

// API routes for HTTP requests
app.use('/api/weather', weatherRoutes);

// Error handling middleware for API routes
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Create HTTP and WebSocket servers
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let clients = [];

// WebSocket connection handler
wss.on('connection', (ws) => {
  console.log('Client connected');

  let city = 'London'; // Default city
  clients.push({ ws, city });

  // Handle incoming messages from clients
  ws.on('message', (message) => {
    try {
      const parsedMessage = JSON.parse(message);

      if (parsedMessage.city) {
        city = parsedMessage.city;
        console.log(`Received city from client: ${city}`);

        // Update the client's city
        const clientIndex = clients.findIndex((client) => client.ws === ws);
        if (clientIndex > -1) {
          clients[clientIndex].city = city;
        }
      }
    } catch (error) {
      console.error('Error parsing client message:', error.message);
      ws.send(JSON.stringify({ error: 'Invalid message format' }));
    }
  });

  // Handle WebSocket client disconnections
  ws.on('close', () => {
    clients = clients.filter(client => client.ws !== ws);
    console.log('Client disconnected');
  });

  // Handle WebSocket errors
  ws.on('error', (err) => {
    console.error('WebSocket error:', err.message);
    ws.close();
  });
});

// Broadcast weather data to WebSocket clients
const broadcastWeatherData = (weatherData, city) => {
  clients.forEach((client) => {
    if (client.ws.readyState === WebSocket.OPEN && client.city === city) {
      try {
        client.ws.send(JSON.stringify(weatherData));
      } catch (error) {
        console.error('Error broadcasting weather data to client:', error.message);
      }
    }
  });
};

// Fetch and broadcast weather data every 10 seconds
cron.schedule('*/10 * * * * *', async () => {
  try {
    for (const client of clients) {
      try {
        const weatherData = await weatherService.fetchWeatherFromApi(client.city);
        broadcastWeatherData(weatherData, client.city); // Send updates to WebSocket clients
      } catch (error) {
        console.error(`Error fetching weather data for ${client.city}:`, error.message);
      }
    }
  } catch (error) {
    console.error('General error in cron job:', error.message);
  }
});

// Error handling for uncaught promise rejections and unhandled errors
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Promise Rejection:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error.message);
  process.exit(1); // Optional: consider restarting the process
});

// Start the server
const PORT = config.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
