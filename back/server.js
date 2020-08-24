const express = require('express');
const app = express();
const cors = require('cors');
const logger = require('morgan');


// middleware
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use('/public', express.static(__dirname + '/public'));

// routes
app.use('/', require('./routes/tiles'));
app.use('/admin', require('./routes/admin'));


app.listen(5000, () => {
  console.log('Server started on port 5000');
})