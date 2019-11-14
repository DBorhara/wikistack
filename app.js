const morgan = require('morgan')

//Local
const { db } = require('./models/index');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');

//External
const express = require('express');
const app = express();


// ...
app.use(morgan('dev'));
app.use('/wiki', wikiRouter);
// or, in one line: app.use('/wiki', require('./routes/wiki'));

app.get('/', (req, res) => {
  res.send('hi')
});

db.authenticate().
then(() => {
  console.log('Database authenticated');
})

const port = 3000;

const connector = async () => {
  await db.sync({
    force: true,
  });
  console.log('testing')
  app.listen(port, () => {
    console.log(`Database synced: ${port}`)
  });
}

connector();

// app.listen(port, () => {
//   console.log(`Listening in on port: ${port}`)
// });
