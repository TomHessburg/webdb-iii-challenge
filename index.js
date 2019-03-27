const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile.js')


const db = knex(knexConfig.development);
const server = express();
server.use(express.json());

        //baseline cohort routes
server.get('/api/cohorts', (req,res) => {
    db('cohorts')
        .then(chs => res.status(200).json(chs))
        .catch(err => res.status(500).json(err))     
})
server.post('/api/cohorts', (req,res) => {
    db('cohorts')
        .insert(req.body)
        .then(ids => {
            const id = ids[0]
            db('cohorts')
                .where({ id: id })
                .first()
                .then(inserted => res.status(201).json(inserted))
                .catch(err => res.status(404).json(err))
        })
        .catch(err => res.status(500).json(err))
        
})
server.get('/api/cohorts/:id', (req,res) => {
    db('cohorts')
        .where({ id: req.params.id })
        .then(cohort => res.status(200).json(cohort))
        .catch(err => res.status(500).json(err))
})
server.put('/api/cohorts/:id', (req,res) => {
    db('cohorts')
        .where({id: req.params.id})
        .update(req.body)
        .then(count => {
            if(count > 0){
                res.status(204).json('successfully updated')
            }else{
                res.status(404).json('cohort not found')
            }
        })
        .catch(err => res.status(500).json(err))
})

        //get students by cohort







server.get('/', (req,res) => {
    res.send('webapi-iii project by Thomas Hessburg');
})
const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`\n** API running on http://localhost:${port} **\n`)
);
