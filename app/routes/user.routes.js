const {awthJwt}=require("../middlewares/authJwt");
const controllers=require("../controllers/user.controller");
const authJwt = require("../middlewares/authJwt");

module.exports=function(app){
    app.use(function(req,res,next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token,Origin,Content-Type,Accept"
        );
        next();
    })
    app.get("/api/test/all", controllers.allAccess);
    app.get("/api/test/user",[authJwt.verifyToken],controllers.userBoard);
    app.get(
        "/api/test/mod",
        [authJwt.verifyToken, authJwt.isModerator],
        controllers.moderatorBoard
      );
    
      app.get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controllers.adminBoard
      );
    };
