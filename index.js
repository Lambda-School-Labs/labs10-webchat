const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
// Changed Express Variable from server to App for Socket.io
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

// Socket.io
const socketIo = require('socket.io');
const http = require('http');
var server = http.createServer(app);
var io = socketIo(server);


io.on('connection', (socket) => {
  console.log(socket.id);

  socket.on('SEND_MESSAGE', function(data){
      io.emit('RECEIVE_MESSAGE', data);
  })
});

// io.on('connection', function(socket) {
//   console.log(`Listening for 'connection' on client${socket.id}`);

//   socket.on('SEND_MESSAGE', function(data){
//     console.log('SEND_RECEIVE is triggered');
//     io.emit('RECEIVE_MESSAGE', data);
//   });
  
//   socket.on('disconnect', () => console.log('Client disconnected'));
// });

const repRoutes = require('./routes/reprensentatives/repRoutes');
const customersRoutes = require('./routes/customers/customersRoutes');
const companiesRoutes = require('./routes/companies/companiesRoutes');
const billingRoutes = require('./routes/billing/billingRoutes');


app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());


app.get('/',(req, res) => {
  res.send("Welcome to Webchat app....");
});

app.use('/api/reps', repRoutes);
app.use('/api/customers', customersRoutes);
app.use('/api/companies', companiesRoutes);
app.use('/api/billing', billingRoutes);


app.use(function(req, res) {
  res.status(404).send("Wrong URL. This page does not exist");
});


server.listen(port, () => {
  console.log(`=== API is listening at ${port} ===`);
});

