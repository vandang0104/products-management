const express = require("express");
const methodOverride = require("method-override")
const bodyParser = require('body-parser')

require("dotenv").config();

const systemConfig = require("./config/system");

const route = require('./routes/client/index.route');
const routeAdmin = require('./routes/admin/index.route')
const database = require("./config/database");

database.connect();

const app = express();
const port = process.env.PORT;

app.use(methodOverride("_method"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())


app.use(express.static("public"));
app.set("views", "./views");
app.set("view engine", "pug");

app.locals.prefixAdmin = systemConfig.prefixAdmin;

route(app);
routeAdmin(app);

app.listen(port, () => {
  console.log(`App listener port ${port}`)
})