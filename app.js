const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors')
const path = require('path');
require('dotenv').config();


const https = require('https');
const fs = require('fs');


const articles = require('./routes/articlesRoute.js');
const users = require('./routes/usersRoute.js');
const config = require('./config.js');

// const MONGODB_URI = config.mongodburi || 'mongodb://localhost/basic-mern-app';
const MONGODB_URI = config.mongodburi;
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
});
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (error) => {
  console.log(error);
});

let app = express();

// Body Parser Middleware
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors({ origin: "*", credentials: true }));


app.use(express.static(path.join(__dirname, 'client/build')));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === 'OPTIONS') {
    res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use('/api/articles', articles);
app.use('/api/users', users);
app.use('/api/users', users);

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '/client/build/index.html'));
// });



// --------------------------------- LIVE REQUEST

const options = {
  key: fs.readFileSync('/etc/ssl/private/ssl-cert-snakeoil.key'),
  cert: fs.readFileSync('/etc/ssl/certs/ssl-cert-snakeoil.pem')
};

https.createServer(options,app, function (req, res) {
  res.writeHead(200);
  res.end("hello world\n");
  console.log('Server started on port', PORT);
}).listen(PORT);

// ------------------------------- LIVE REQUEST END

// ------------------------------- LOCAL REQUEST

// app.listen(PORT, () => {
//   console.log('Server started on port', PORT);
// });

// ------------------------------- LOCAL REQUEST END