~require('dotenv').config()
const cors =require('cors')
const express = require('express')
const connectDB = require('./connectDB')
const Book = require('./models/Books')



const app = express()
const PORT = process.env.PORT || 8000


//middleware
connectDB()
app.use(cors())
app.use(express.urlencoded({extended:true}));
app.use(express.json())



app.get('/api/books', async (req,res)=>{
try {

    const {category} = req.query

    const filter = {};

    if(category){
        filter.category = category
    }


    const data = await Book.find(filter)
    res.json(data)
} catch (error) {
    res.status(500).json({error:'An error occurred while fetching books'})
}
})


app.get('/api/books/:slug',async (req,res)=>{

    try {
        const {slug} = req.params

        const book = await Book.findOne({slug:slug})
        res.json(book)
        
    } catch (error) {
        
    }


})


app.post('/api/books', async(req,res)=>{
    try {

        const {title, slug, stars,description,category
        } = req.body

        const newBook = new Book({
            title: title,
            slug: slug,
            stars:stars,
            description: description,
            category: category,
            //thumbNail:req.file.thumbnail,
        })
        const book = await Book.create(newBook)

        res.json({})
    } catch (error) {
        console.log(error)
    }
})


app.get('/', (req,res)=>{
    res.json('hello')
})


app.get('*',(req,res)=>{
    res.sendStatus('404')
})

app.listen(PORT,()=>console.log(`Server is listening on port ${PORT}`))