const express = require('express');
const server = express();

const cohorts = require('./routers/cohorts-router');
const students = require('./routers/students-router');

server.use(express.json());
server.use('/api/cohorts', cohorts);
server.use('/api/students', students);





server.get('/', (req,res) => {
    res.send('webapi-iii project by Thomas Hessburg');
})
const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`\n** API running on http://localhost:${port} **\n`)
);
