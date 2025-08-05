const routerHome = require("./home.route");
const routerProducts = require("./product.route") ;

module.exports=(app) =>{  
  app.use('/',routerHome);
  app.use('/products',routerProducts);
}