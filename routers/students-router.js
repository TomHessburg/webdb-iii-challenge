const express = require('express');
const router = express.Router();

const knex = require('knex');
const knexConfig = require('../knexfile')
const db = knex(knexConfig.development);

router.get('/', (req,res) => {
    db('students')
        .then(chs => res.status(200).json(chs))
        .catch(err => res.status(500).json(err))     
})
router.post('/', (req,res) => {
    db('students')
        .insert(req.body)
        .then(ids => {
            const id = ids[0]
            db('students')
                .where({ id: id })
                .first()
                .then(inserted => res.status(201).json(inserted))
                .catch(err => res.status(404).json(err))
        })
        .catch(err => res.status(500).json(err))
        
})
router.get('/:id', (req,res) => {
    db('students')
        .where({ id: req.params.id })
        .then(cohort => res.status(200).json(cohort))
        .catch(err => res.status(500).json(err))
})
router.put('/:id', (req,res) => {
    db('students')
        .where({id: req.params.id})
        .update(req.body)
        .then(count => {
            if(count > 0){
                res.status(204).json('successfully updated')
            }else{
                res.status(404).json('students not found')
            }
        })
        .catch(err => res.status(500).json(err))
})
router.delete('/:id', (req,res) => {
    db('students')
        .where({id: req.params.id})
        .del()
        .then(output => res.status(200).json('successfully deleted student'))
        .catch(err => res.status(500).json(err))

})

module.exports = router;