const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(cors());
app.use(express.json());

const MENU_FILE = path.join(__dirname, 'menu.json');

// Default initial menu if menu.json doesn't exist
const initialMenu = [
  { id: 1, name: "Aduto Signature Burger", price: 15.50, desc: "Juicy beef patty, house sauce, cheddar." },
  { id: 2, name: "Iced Caramel Macchiato", price: 5.50, desc: "Rich espresso layered with fresh milk and caramel." }
];

// Read Menu Helper
const getMenu = () => {
  if (!fs.existsSync(MENU_FILE)) {
    fs.writeFileSync(MENU_FILE, JSON.stringify(initialMenu, null, 2));
  }
  return JSON.parse(fs.readFileSync(MENU_FILE, 'utf8'));
};

// API Endpoints
app.get('/api/menu', (req, res) => res.json(getMenu()));

app.post('/api/menu', (req, res) => {
  fs.writeFileSync(MENU_FILE, JSON.stringify(req.body, null, 2));
  io.emit('menu_updated', req.body);
  res.json({ success: true, menu: req.body });
});

// Socket.io Real-time Events
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('place_order', (orderData) => {
    console.log('New Order Received:', orderData);
    io.emit('new_order', { ...orderData, id: Date.now(), status: 'Pending' });
  });

  socket.on('update_order_status', (data) => {
    io.emit('order_status_changed', data);
  });
});

server.listen(5000, () => console.log('Server running on http://localhost:5000'));