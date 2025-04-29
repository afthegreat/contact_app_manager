const dotenv= require("dotenv").config()

const express=require("express")
const erroHandler = require("./middleware/errorhandler")
const connectDb = require("./config/dbConnection")
const app= express()
const port=process.env.PORT ||5000

connectDb()
app.use(express.json())
app.use("/api/contacts",require("./routes/conatactRoutes"))
app.use(erroHandler)
app.listen(port, () =>{
    console.log(`server running on port: ${port}`)
})