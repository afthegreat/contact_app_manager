const dotenv= require("dotenv").config()
const cors= require("cors")
const express=require("express")
const erroHandler = require("./middleware/errorhandler")
const connectDb = require("./config/dbConnection")
const app= express()
const port=process.env.PORT ||5000

connectDb()

app.use(cors({origin:"http://localhost:5173",
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))
app.use(express.json())
app.use("/api/contacts",require("./routes/conatactRoutes"))
app.use("/api/users",require("./routes/userRoutes"))
app.use(erroHandler)
app.listen(port, () =>{
    console.log(`server running on port: ${port}`)
})