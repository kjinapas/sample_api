const express= require('express')
const router = express.Router()
const axios = require('axios');


const BASE_URL = 'https://api.unsplash.com';
const MAX_IMAGES_PER_REQUEST = 30; // Assuming this is your intended max
const unsplash = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_API_KEY}`
    }
});

async function fetchImages(query, numImages) {


    try {
        const response = await unsplash.get('/search/photos', {
            params: {
                query: query,
                per_page: Math.min(numImages, MAX_IMAGES_PER_REQUEST),
           
                order_by: 'random'
            }
        });
        return response.data.results;
    } catch (error) {
        console.error('Unsplash Error:', error);
        throw error; // Re-throw to propagate error 
    }
}


router.get('/:guery/:number',async(req,res)=>{
    let query = req.params.guery
    let number = parseInt(req.params.number)
    try{
        const datas = await fetchImages(query, number);
        let books = datas; 
        res.json(books)
    }catch(err){
        console.log(err)
    }

})


router.get('/:t/:guery/:number',async(req,res)=>{
    let text  = req.params.t
    let query = req.params.guery
    let number = parseInt(req.params.number)
    try {
        const response = await unsplash.get('/search/photos', {
            params: {
                query: query,
                per_page: Math.min(number, MAX_IMAGES_PER_REQUEST),
                orientation: text==='p'?"portrait":text==="l"?"landscape":"portrait",
                order_by: 'random'
            }
        });
        res.json(response.data.results);
    } catch (error) {
        console.error('Unsplash Error:', error);
        throw error; // Re-throw to propagate error 
    }

})




module.exports  = router