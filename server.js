const dotenv = require("dotenv")
dotenv.config({quiet:true})
const express = require("express")
const connectdb = require("./configs/db")
const routes = require("./routes/adminroutes")
const morgan = require("morgan")
const helmet = require("helmet")
const cors = require("cors")
const app = express()
if (process.env.MONGO_URI !== "test") {
    connectdb()
}
// connectdb()
app.use(express.json())
app.use(morgan("dev"))
app.use(helmet())
app.use(cors({
    origin: "*"
}))

app.use("/api",routes)

const port = process.env.PORT || 4000
app.listen(port,()=>{
    console.log(`server is connected on ${port} port`);
    
}) 