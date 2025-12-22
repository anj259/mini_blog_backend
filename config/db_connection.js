const mongoose=require('mongoose')

const MONGO_URI = process.env.db_url || 'mongodb://localhost:27017/mini_blog';

const  Connection = async()=>
{
    const connect=mongoose.connect(MONGO_URI);
    if(connect)
    {
        console.log("database connected");
    }
    else
    {
        console.log("database not");
    }
}


module.exports = Connection;