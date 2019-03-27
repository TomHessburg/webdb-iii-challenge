const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile.js')


const db = knex(knexConfig.development);

const server = express();

server.use(express.json());

const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`\n** API running on http://localhost:${port} **\n`)
);
