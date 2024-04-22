require('dotenv').config(); // Ensure this is at the very top
const cors = require('cors')
const express = require('express');
const app = express();
const unsplash = require('./route/unsplash')
const book_store= require('./route/bookstore')
const article= require('./route/article_thai')
const article_eng = require('./route/article_eng')
const cus_id = require('./route/Cus')
const people = require('./route/People')
app.use(cors())



app.use('/books',book_store)
app.use('/unsplash',unsplash)
app.use('/article',article)
app.use('/article_eng',article_eng)
app.use('/customers',cus_id)
app.use('/people',people)







//how to ues  const datas = await fetchImages("nature", 3);  (call)
//===============================================================================================

app.get('/', async (req, res) => { 
    res.send("choice api path/books/unsplash/article/article_eng")
});

app.listen(process.env.PORT||3000, () => {
    console.log("Express server on");
}); 
