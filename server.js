const express = require('express') 
const cors = require('cors');
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(cors())
const PORT = process.env.PORT || 3001
app.locals.title = 'BYOB';
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.get('/api/v1/govt', (req, res) => {
  res.send('its the govt!')
})



// Get All bills
app.get('/api/v1/govt/bills', (request, response) => {
  database('bills').select()
    .then((bills) => {
      response.status(200).json(bills);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
})

// Get bills by sponsor id
app.get('/api/v1/govt/bills:id', (req, res) => {
  database('bills').select()
  .then((bills) => {
    response.status(200).json(bills);
  })
  .catch((error) => {
    response.status(500).json({ error });
  });

})

// Get all senators 
app.get('/api/v1/govt/senators', (req, res) => {
  
})

// Get senator by id
app.get('/api/v1/govt/senators/:id', (req, res) => {
  
})

// Post bill
app.post('/api/v1/govt/bills', (req, res) => {
  
})

// Post senator
app.post('/api/v1/govt/senators', (req, res) => {
  
})

// Delete bill
app.delete('/api/v1/govt/bills', (req, res) => {
  
})

// Delete senator
app.delete('/api/v1/govt/senators', (req, res) => {
  
})


app.listen(PORT, () => {
  console.log(`${app.locals.title} is running on ${PORT}.`);
});


