import express from 'express'
const cors = require('cors');
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(cors())
app.set('port', process.env.PORT || 3001);
app.locals.title = 'BYOB';

app.get('/', (req,res) => {res.send('hi')})



// Get All bills

// Get bills by sponspor name

// Get all senators 

// Get senator by name

// Post bill

// Post senator

// Delete bill

// Delete senator


app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});


