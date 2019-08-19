const express = require('express') 
//  imports express to allow us to use it
const app = express();
//  calls express and creates the object which perform its functions
app.use(express.static('public'));
app.use(express.json());
// parses incoming json


const PORT = process.env.PORT || 3001
// tells it the port should either be the deployed environment or port 3001
app.locals.title = 'BYOB';
// gives it a name
const environment = process.env.NODE_ENV || 'development';
// tells it to run on deployed if possible otherwise run in development
const configuration = require('./knexfile')[environment];
//sets up the link to the knexfile
const database = require('knex')(configuration);
// sets up the link the database

app.get('/api/v1/govt', (req, res) => {
  res.send('its the govt!')
})
//me making sure my app was listening correctly


// Get All bills
app.get('/api/v1/govt/bills', (request, response) => {
  // listens for a request at this api point, puts in the argument of request/response into a callback function
  database('bills').select()
  // selects all bills from the table named bills
    .then((bills) => {
      response.status(200).json(bills);
      //if no error, sends back all the bills
    })
    .catch((error) => {
      response.status(500).json({ error });
      // responds that the bill was unable to be found
    });
})

// Get bills by sponsor id
app.get('/api/v1/govt/bills/:id', (request, res) => {
    // listens for a request at this api point, puts in the argument of request/response into a callback function

  database('bills').where('senator_key', request.params.id).select()
  // selects the bills from the bills table, that match the parameter that was sent through the url
  .then(bills => {
    if(bills.length) {
      res.status(200).json(bills)
      //if a bill is found, then the array length will come out to true, it send back those bills
    } else {
      res.status(400).json({
        error: `Could not find bill with id${request.params.id}`
        // if a bill is not, then the array length is 0 and it send back an error
      })
    }
  })
  .catch(error => {
    res.status(500).json({ error });
  });
})

// Get all senators 
app.get('/api/v1/govt/senator', (request, response) => {
    // listens for a request at this api point, puts in the argument of request/response into a callback function

  database('senator').select()
  // selects all the senators from the senator table
  .then((senator) => {
    response.status(200).json(senator);
    // responds with the senators that were found
  })
  .catch((error) => {
    response.status(500).json({ error });
  });
})
  

// Get senator by id
app.get('/api/v1/govt/senator/:id', (request, response) => {
    // listens for a request at this api point, puts in the argument of request/response into a callback function

  database('senator').where('id', request.params.id).select()
  // selects the senator that matches the id that was sent through the parameter in the url
    .then((senator) => {
      if(senator.length) {
        response.status(200).json(senator)
        //if a senator is found, then the array length will come out to true, it send back those senators

      } else {
        response.status(400).json({
          error: `Could not find senator with id${request.params.id}`
          // if a senator is not found, then the array length is 0 and it send back an error
        })
      }
    })
    .catch(error => {
      res.status(500).json({ error });
    });
})

// Post bill
app.post('/api/v1/govt/bills', (request, response) => {
    // listens for a request at this api point, puts in the argument of request/response into a callback function

  const bill = request.body
  for(let requiredParameter of ['number', 'title', 'url', 'committees', 'senator_key']){
    // creates keys that need to be required in the body of the request
    if(!bill[requiredParameter]) {
      return response.status(422).send({error: `expected format {
        number: <string>,
        title: <string>,
        url: <string>,
        committees: <string>,
        senator_key: <integer>
      }
      `})
      // creates an error if those keys are not found.
    }
  }

  database('bills').insert(bill, 'id')
  // inserts the new bill into the bills table
  .then(bill => {
    response.status(200).json({ id: bill[0]})
    // sends back the new bill id as confirmation it was added correctly
  })
  .catch(error => {
    response.status(500).json({ error });
  });
})

// Post senator
app.post('/api/v1/govt/senator', (request, response) => {
    // listens for a request at this api point, puts in the argument of request/response into a callback function

  const senator = request.body
  for(let requiredParameter of ['first_name', 'last_name', 'total_votes', 'contact', 'state', 'party']) {
        // creates keys that need to be required in the body of the request

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
          // creates an error if those keys are not found.

  }
  database('senator').insert(senator, 'id')
  .then(senator => {
    response.status(201).json({ id: senator[0]})
    // returns the id of the senator to confirm it has been added correctly
  })
  .catch(error => {
    response.status(500).json({ error });
  });
})

// Delete bill
app.delete('/api/v1/govt/bills/:id', (req, res) => {
    // listens for a request at this api point, puts in the argument of request/response into a callback function

  const {id} = req.params
  // destructures id of the request param
  database('bills').where('id', id).del()
  // deletes the row where the id matches request param id 
  .then(bills => {
    // bills is the number of rows effected
    console.log(bills)
    if(bills) {

      res.status(200).json({Sucess: `You have deleted bill with id ${id}`})
      // returns success message
    } else {
      res.status(400).json({
        error: `Could not find bill with id ${id}`
        // if no rows were effected, it sends this message
      })
    }
  })


  .catch(error => {
    res.status(500).json({ error });
  });
})

// Delete senator
app.delete('/api/v1/govt/senator/:id', (req, res) => {
    // listens for a request at this api point, puts in the argument of request/response into a callback function

  const { id } = req.params
    // destructures id of the request param
  database('senator').where('id', id).del()
    // destructures id of the request param
  .then(senator => {
    // senator is the number of rows effected

    if(senator) {
      res.status(200).json({Sucess: `You have deleted senator with id ${id}`})
            // returns success message

    } else {
      res.status(400).json({
        error: `Could not find senator with id ${id}`
                // if no rows were effected, it sends this message

      })
    }
  })
  .catch(error => {
    res.status(500).json({ error })
  })
 
})


app.listen(PORT, () => {
  console.log(`${app.locals.title} is running on ${PORT}.`);
});



