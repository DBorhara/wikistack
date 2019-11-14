//Local
const { db } = require('./models/index');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');

//External
const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

app.use('/wiki', wikiRouter);
app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.redirect('/wiki')
});

db.authenticate().then(() => {
  console.log('Database authenticated');
});

const port = 3000;

const connector = async () => {
  await db.sync({
    force: true,
  });
  console.log('testing');
  app.listen(port, () => {
    console.log(`Database synced: ${port}`);
  });
};

connector();

// app.listen(port, () => {
//   console.log(`Listening in on port: ${port}`)
// });
