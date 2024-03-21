require('dotenv').config(); // Ensure this is at the very top

const express = require('express');
const app = express();
const unsplash = require('./route/unsplash')
const book_store= require('./route/bookstore')
const article= require('./route/article_thai')


app.use('/books',book_store)
app.use('/unsplash',unsplash)
app.use('/article',article)







//how to ues  const datas = await fetchImages("nature", 3);  (call)
//===============================================================================================

app.get('/', async (req, res) => { 
    res.send("choice api path/books/unsplash/article")
});

app.listen(process.env.PORT||3000, () => {
    console.log("Express server on");
}); 
