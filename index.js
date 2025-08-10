const express = require("express") ;
require("dotenv").config() ;

const route = require('./routes/client/index.route');
const routeAdmin = require('./routes/admin/index.route')
const database = require("./config/database") ;

database.connect() ;

const app = express() ;
const port = process.env.PORT ;


app.use(express.static("public"));
app.set("views", "./views");
app.set("view engine", "pug");

route(app);
routeAdmin(app) ;

app.listen(port,()=>{
    console.log(`App listener port ${port}`)
})