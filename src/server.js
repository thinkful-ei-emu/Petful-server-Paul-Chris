const express = require('express');
const cors = require('cors');
const {PORT,NODE_ENV,CLIENT_ORIGIN} = require('./config');
const catRouter=require('./routes/catRouter');
const dogRouter=require('./routes/dogRouter');

const app = express();
app.use(cors({
  origin: CLIENT_ORIGIN
}) );

app.use('/api/cat', catRouter);
app.use('/api/dog', dogRouter);


// Catch-all 404
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Catch-all Error handler
// Add NODE_ENV check to prevent stacktrace leak
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: NODE_ENV === 'development' ? err : {}
  });
});

app.listen(PORT,()=>{
  console.log('Serving on '+PORT);
});