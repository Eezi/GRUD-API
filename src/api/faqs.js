const express = require('express');
const monk = require('monk');

//connects to the database
const db = monk(process.env.MONGO_URI);
const faqs = db.get('faqs')
const Joi = require('@hapi/Joi');

const schema = Joi.object({
    question: Joi.string().trim().required(),
    answer: Joi.string().trim().required(),
});

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
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const item = await faqs.findOne({
            _id: id,
        });
        if(!item) return next();
        return res.json(item);

    } catch (error) {
      next(error)  
    }
});

//CREATE ONE 
router.post('/', async (req, res, next) => {
    try {
        const value = await schema.validateAsync(req.body);
        const inserted = await faqs.insert(value);
        res.json(inserted);
    } catch (error) {
        next(error);
    }
    res.json({
    })
});

//UPDATE ONE 
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const value = await schema.validateAsync(req.body);
        const item = await faqs.findOne({
            _id: id
        });
        if(!item) return next();
        const updated = await faqs.update({
            _id: id
        }, {
            $set: value
        });
        res.json(value);
    } catch (error) {
        next(error);
    }
    res.json({
    })
});

//DELETE ONE 
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await faqs.remove({_id: id});
        res.json({
            message: 'Success'
        });
    }catch(error){
        next(error);
    }
});

module.exports = router;