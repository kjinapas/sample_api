const express= require('express')
const router = express.Router()
const path = require('path')
const csv = require('csvtojson');



const filePath = path.resolve(__dirname, '../db/json_stiarticles_csv.csv')

router.get('/:number', async (req, res) => {
    try {
        const limit = parseInt(req.params.number)
        const jsonArray = await csv().fromFile(filePath).then(jsonArray => jsonArray.slice(0, limit));
   
        res.json(jsonArray);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/', async (req, res) => {
    try {
       
        const jsonArray = await csv().fromFile(filePath);
        res.json(jsonArray);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




module.exports = router