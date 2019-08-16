const senatorsData = require('../dataCleaner')

const createSeantors = (knex, senator) => {
  return knex('senator').insert({
    first_name: senator.title,
    last_name: senator.last_name,
    total_votes: senator.total_votes,
    contact: senator.contact_form,
    state: senator.state,
    party: senator.party
  }, 'id')
  .then(senatorId => {
    let billPromises = [];

    senator.bills.forEach(bill => {
      billPromises.push(
        createBills(knex, {
          number: bill.number,
          title: bill.title,
          url: bill.url,
          committees: bill.committees,
          senator_key: senatorId[0]
        })
      )
    });

    return Promise.all(billPromises);
  })
};

const createBills = (knex, bill) => {
  return knex('bills').insert(bill);
};

exports.seed = (knex) => {
  return knex('bills').del() // delete footnotes first
    .then(() => knex('senator').del()) // delete all senators
    .then(() => {
      let senatorPromises = [];

      senatorsData.forEach(senator => {
        senatorPromises.push(createSeantors(knex, senator));
      });

      return Promise.all(senatorPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};