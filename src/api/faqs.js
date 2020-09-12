const express = require('express');
const monk = require('monk');

//connects to the database
const db = monk(process.env.MONGO_URI);
const faqs = db.get('faqs')

const router = express.Router();

//READ ALL
router.get('/', async (req, res, next) => {
    try {
        const items = await faqs.find({});
        res.json(items);
    } catch (error) {
        console.log(error);
    }
});

//READ ONE 
router.get('/:id', (req, res, next) => {
    res.json({
        message: 'Hello read one!'
    })
});

//CREATE ONE 
router.post('/', (req, res, next) => {
    res.json({
        message: 'Hello create one!'
    })
});

//UPDATE ONE 
router.put('/:id', (req, res, next) => {
    res.json({
        message: 'Hello update one!'
    })
});

//DELETE ONE 
router.delete('/:id', (req, res, next) => {
    res.json({
        message: 'Hello delete one!'
    })
});

module.exports = router;