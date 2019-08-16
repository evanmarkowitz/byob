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
app.get('/api/v1/govt/bills/:id', (request, res) => {
  database('bills').where('senator_key', request.params.id).select()
  .then(bills => {
    if(bills.length) {
      res.status(200).json(bills)
    } else {
      res.status(400).json({
        error: `Could not find bill with id${request.params.id}`
      })
    }
  })
  .catch(error => {
    res.status(500).json({ error });
  });
})

// Get all senators 
app.get('/api/v1/govt/senator', (request, response) => {
  database('senator').select()
  .then((senator) => {
    response.status(200).json(senator);
  })
  .catch((error) => {
    response.status(500).json({ error });
  });
})
  

// Get senator by id
app.get('/api/v1/govt/senator/:id', (request, response) => {
  database('senator').where('id', request.params.id).select()
    .then((senator) => {
      if(senator.length) {
        response.status(200).json(senator)
      } else {
        response.status(400).json({
          error: `Could not find senator with id${request.params.id}`
        })
      }
    })
    .catch(error => {
      res.status(500).json({ error });
    });
})

// Post bill
app.post('/api/v1/govt/bills', (request, response) => {
  const bill = request.body
  for(let requiredParameter of ['number', 'title', 'url', 'committees', 'senator_key']){
    if(!bill[requiredParameter]) {
      return response.status(422).send({error: `expected format {
        number: <string>,
        title: <string>,
        url: <string>,
        committees: <string>,
        senator_key: <integer>
      }
      `})
    }
  }
  database('bills').insert(bill, 'id')
  .then(bill => {
    response.status(200).json({ id: bill[0]})
  })
  .catch(error => {
    response.status(500).json({ error });
  });
})

// Post senator
app.post('/api/v1/govt/senator', (request, response) => {
  const senator = request.body
  for(let requiredParameter of ['first_name', 'last_name', 'total_votes', 'contact', 'state', 'party']) {
    if(!senator[requiredParameter]) {
      return response.status(422).send({error: 
        ` expected format { first_name: <varchar>,
        last_name: <varchar>,
        total_votes: <varchar>,
        contact: <varchar>,
        party: <varchar>}
        You are missing a ${requiredParameter} property`
      })
    }
  }
  database('senator').insert(senator, 'id')
  .then(senator => {
    response.status(201).json({ id: senator[0]})
  })
  .catch(error => {
    response.status(500).json({ error });
  });
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


