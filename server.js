const express = require('express') 
const cors = require('cors');
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(cors())
const PORT = process.env.PORT || 3001
app.locals.title = 'BYOB';

app.get('/api/v1/govt', (req, res) => {
  res.send('its the govt!')
})



// Get All bills
app.get('/api/v1/govt/bills', (req, res) => {
  
})

// Get bills by sponspor name
app.get('/api/v1/govt/bills:id', (req, res) => {
 
})

// Get all senators 
app.get('/api/v1/govt/senators', (req, res) => {
  
})

// Get senator by name
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


