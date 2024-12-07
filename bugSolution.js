const express = require('express');
const app = express();
app.get('/', (req, res) => {
  someAsyncOperation()
    .then(() => {
      res.send('Hello, world!');
    })
    .catch(err => {
      console.error('Error during async operation:', err);
      res.status(500).send('An error occurred on the server.');
    });
});
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

async function someAsyncOperation() {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldFail = Math.random() < 0.5;
      if (shouldFail) {
        reject(new Error('Network error'));
      } else {
        resolve();
      }
    }, 1000);
  });
}