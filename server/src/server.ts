import express from 'express'

const app = express();

app.get('/ads', (request, response) => {
  response.json({ message: 'Ok!' }).status(200)
});

app.listen(3333)