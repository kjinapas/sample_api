const express= require('express')
const router = express.Router()
const path = require('path')
const csv = require('csvtojson');

const filePath = path.resolve(__dirname, '../db/articles.csv')

 function apiKeyAuth(req, res, next) {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || apiKey !== process.env.API_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
}



router.get('/',apiKeyAuth, async (req, res) => {
    try {

        const jsonArray = await csv().fromFile(filePath);
        const selectedColumns = jsonArray.map(({ id, author,title,claps,reading_time }) => ({ id, author,title ,claps,reading_time}));
        res.json(selectedColumns);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/:id',apiKeyAuth, async (req, res) => {
    try {
        const idToFind = req.params.id
        const jsonArray = await csv().fromFile(filePath);
        const foundRow = jsonArray.find(row => row.id === idToFind);
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

module.exports = router