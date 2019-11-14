const express = require('express');
const app = express();
const { db } = require('./models/index');

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
