const members = require('./members.js')
const bills = require('./bills.js')

const cleanMembers = (members, bills) => {
  const pMembers = members
  const pBills = bills

  let memWithBills =  pMembers.reduce((acc, senator) => {
    senator.bills = []
    senatorName = `${senator.first_name} ${senator.last_name}`
    bills.forEach(bill => {
      if (bill.sponsor_name === senatorName) {
        senator.bills.push(bill)
      }
    });
    console.log(senator.bills)
    acc.push(senator)
    return acc
  },[])
  return memWithBills
}

let data = cleanMembers(members, bills)

module.exports =  data



