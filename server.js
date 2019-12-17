const express  = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');
const photoRouter = require('./routes/api/photo');

// config vars
const db   = process.env.MONGODB_URI || 'mongodb://localhost/blog35';
const port = process.env.PORT        || 3000;

const app = express();

// db connection
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log(`DB connected @ ${db}`);
  })
.catch(err => console.error(`Connection error ${err}`));

// set views
app.set('view engine', 'pug');
app.set('views', './views');

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));
app.use(express.static('public'));

// set routes
app.use('/', router);
app.use('/api', photoRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});