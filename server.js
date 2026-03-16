const express = require("express")
const serverless = require("serverless-http")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

const accounts = {
    demo: { password: "demo", balance: 10000 }
}

app.post("/login", (req,res)=>{

    const { username,password } = req.body

    if(!accounts[username] || accounts[username].password !== password){
        return res.status(401).json({ error:"Invalid credentials" })
    }

    res.json({
        success:true,
        user:{
            username,
            balance:accounts[username].balance
        }
    })

})

app.post("/create", (req,res)=>{

    const { username,password } = req.body

    if(accounts[username]){
        return res.status(400).json({ error:"User exists" })
    }

    accounts[username] = {
        password,
        balance:10000
    }

    res.json({ success:true })

})

module.exports.handler = serverless(app)