const express= require('express')
const router = express.Router()
const fs= require('fs')
const path = require('path')






const filePath = path.resolve(__dirname, '../db/bookstore.json')

router.get('/',(req,res,next)=>{
    fs.readFile(filePath, 'utf8', (err, file) => {
          if (err) {
            console.error('Error while reading the file:', err)
            next()
          return
          }
          try {
            const data = JSON.parse(file)
            res.json(data)
            console.log(data)
          } catch (err) {
            console.error('Error while parsing JSON data:', err)
          }
        })
})

module.exports= router