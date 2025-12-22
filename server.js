const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config(); 
const db = require("./config/db_connection");
const user_route = require("./routes/user_route");
const post_route= require("./routes/post_route")

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;

db();

app.use("/api/auth",user_route);
app.use("/api/post",post_route);




app.listen(PORT, () => {
    console.log(`server listenning on port ${PORT}`);
});
