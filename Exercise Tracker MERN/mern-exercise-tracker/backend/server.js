require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')



const port = process.env.PORT || 3000


app.use(cors())
app.use(express.json())



const uri = process.env.MONGODB_URI
 mongoose.connect(uri,{useNewUrlParser:true})
 const connection = mongoose.connection
 connection.once('open',()=>{
    console.log('mongoDB database connection established successfully')
 })


 const exerciseRouter = require('./routes/exercises')
 const userRouter = require('./routes/user')


 app.use('/exercises',exerciseRouter)
 app.use('/users', userRouter)


app.listen(port, ()=>console.log(`server is running on port ${port}`))