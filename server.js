const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const db=require("./app/models");
const dbConfig = require('./app/config/db.config');
const Role = require("./app/models/role.model")
console.log("Role",Role);
const app=express();
app.use(cors(corsoptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
var corsoptions={
    origin:"http://localhost:8081"
};
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);


mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Successfully connected to MongoDB.");
    initial();
}).catch(err=>{
    console.log("Connection error",err);
    process.exit();
});

function initial() {
    Role.estimatedDocumentCount()
      .then((count) => {
        if (count === 0) {
          const roles = ["user", "moderator", "admin"];
          roles.forEach((role) => {
            new Role({
              name: role
            }).save()
              .then(() => {
                console.log(`Added '${role}' to roles collection`);
              })
              .catch((err) => {
                console.log("Error adding role:", err);
              });
          });
        }
      })
      .catch((err) => {
        console.log("Error estimating document count:", err);
      });
  }
  
app.get("/",(req,res)=>{
    res.json({messahe:"Welcome to the application"});
});
const PORT=process.env.PORT ||8082;
app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}.`)
})
