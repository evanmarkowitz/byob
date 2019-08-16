const members = require('./members.js')
const bills = require('./bills.js')

const cleanMembers = (members, bills) => {

  let memWithBills =  members.reduce((acc, senator) => {
    senator.bills = []
    senatorName = `${senator.first_name} ${senator.last_name}`
    bills.forEach(bill => {
      if (bill.sponsor_name === senatorName) {
        senator.bills.push(bill)
      }
    });
    acc.push(senator)
    return acc
  },[])
  return memWithBills
}

let data = cleanMembers(members, bills)

module.exports =  data



