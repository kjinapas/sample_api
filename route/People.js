const express= require('express')
const router = express.Router()
const path = require('path')
const csv = require('csvtojson');

const filePath = path.resolve(__dirname, '../db/people-100.csv')

 

router.get('/', async (req, res) => {
    try {

        const jsonArray = await csv().fromFile(filePath);
      
        res.json(jsonArray);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const idToFind = req.params.id
        const jsonArray = await csv().fromFile(filePath);
        const foundRow = jsonArray.find(row => row.Index === idToFind);
        if(foundRow){
            res.json(foundRow);
        }else{
            res.json({"error":"not found"})
        }
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/limits/:number', async (req, res) => {
    try {
        const limit = parseInt(req.params.number)
        const jsonArray = await csv().fromFile(filePath).then(jsonArray => jsonArray.slice(0, limit));
   
        res.json(jsonArray);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router