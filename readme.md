# Description

BYOB is my first back end project.  The learning goal was to get comforatable in Node.js, Express, and Postgres.  I used data from the U.S. senate that
included every Senator as well as the most recent Bills passed by the Senate
[Deployed Link](https://govtlibrary.herokuapp.com/).

## Tech-stack

- Node.js
- SQL
- Express
- Knex
- PostgreSQL


## Installation Instructions

Clone down the repo - https://github.com/evanmarkowitz/byob

Run ```npm install``` from the root directory

Run ```npm start``` - visit localhost:3001/api/v1/govt/ 

## Endpoints

| url | verb | options | sample response |
| ----|------|---------|---------------- |
| `/api/v1/govt/bills` | GET | not needed | Array of all bills: `[{"id":12,"number":"S.2052","title":"A bill to authorize the honorary promotion of Colonel Charles E. McGee to brigadier general in the United States Air Force.","url":null,"committees":"House Armed Services Committee","senator_key":204},{"id":13,"number":"6","title":"my billl","url":"kevins thing","committees":"evans house  and Reform Committee","senator_key":107},{"id":14,"number":"S.1196","title":"A bill to designate the facility of the United States Postal Service located at 1715 Linnerud Drive in Sun Prairie, Wisconsin, as the \"Fire Captain Cory Barr Post Office Building.","url":"null","committees":"House Oversight and Reform Committee","senator_key":107}]`|
| `http://localhost:3001/api/v1/govt/bills/:id` | GET | not needed | Array of all bills by the sponsors senators key: `[{"id":13,"number":"6","title":"my billl","url":"kevins thing","committees":"evans house  and Reform Committee","senator_key":107},{"id":14,"number":"S.1196","title":"A bill to designate the facility of the United States Postal Service located at 1715 Linnerud Drive in Sun Prairie, Wisconsin, as the \"Fire Captain Cory Barr Post Office Building.","url":"null","committees":"House Oversight and Reform Committee","senator_key":107}]` |
| `http://localhost:3001/api/v1/govt/senator/` | GET | not needed | Array of all the senators: `[{"id":190,"first_name":"Senator, 3rd Class","last_name":"Schumer","total_votes":599,"contact":"https://www.schumer.senate.gov/contact/email-chuck","state":"NY","party":"D","bills":null},{"id":200,"first_name":"Senator, 3rd Class","last_name":"Thune","total_votes":599,"contact":"http://www.thune.senate.gov/public/index.cfm/contact","state":"SD","party":"R","bills":null},{"id":210,"first_name":"Senator, 3rd Class","last_name":"Young","total_votes":599,"contact":"https://www.young.senate.gov/content/contact-senator","state":"IN","party":"R","bills":null}]` |
| `http://localhost:3001/api/v1/govt/senator/:id` | GET | not needed | Array of one senator who matches the id: `[{"id":190,"first_name":"Senator, 3rd Class","last_name":"Schumer","total_votes":599,"contact":"https://www.schumer.senate.gov/contact/email-chuck","state":"NY","party":"D","bills":null}]` |
| `http://localhost:3001/api/v1/govt/bills/` | POST | `{number: <string>, title: <string>, url: <string>, committees: <string>, senator_key: <integer>}` | ID of new Bill : `{ id: 2 }` |
| `http://localhost:3001/api/v1/govt/senator/` | POST | `{first_name: <varchar>,last_name: <varchar>,total_votes: <varchar>,contact: <varchar>, party: <varchar>}` | ID of new Senator : `{ id: 232 }` |
| `http://localhost:3001/api/v1/govt/bills/` | DELETE | not needed | `{Sucess: `You have deleted bill with id ${id}`}` |
| `http://localhost:3001/api/v1/govt/senator/` | DELETE | not needed | `{Sucess: `You have deleted senator with id ${id}`}` |



