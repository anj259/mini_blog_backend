const express =require('express');
const app=express();
const cors = require('cors');
const db= require("./config/db_connection")

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;

db();


app.listen(PORT,()=>
{
    console.log(`server listenning on port ${PORT}`);
});
