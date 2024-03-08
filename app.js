const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const formdata = require("./models/index.js");
const ejsMate = require("ejs-mate")

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"public")));



main()
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err);
    console.log("db err")
})

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/Advisoropedia");
}

//index route
app.get("/user",(req,res)=>{
    res.render("pages/index.ejs",{formdata});
})

// new route
app.get("/user/new",async(req,res)=>{
    //res.send("working");
    const data = await formdata.find();
   // console.log(data);
   res.render("pages/new.ejs");     // send to new.ejs//
});


//create route
app.post("/user",(req,res)=>{
    let {username,email,password} = req.body;
    let newUser  = new formdata({
      name: username,
      email: email,
      password: password,
 });
   newUser.save()
   .then((res)=>{
    console.log("user data saved");})
   .catch((err)=>{
      console.log(err);
   });
     res.redirect("/user")
  });


/*app.post("/user/new",async(req,res)=>{
    let {username,email,password} = req.body;
    let newUser  = new formdata({
        username: username,
        email: email,
        password: password,
   });
   // const newUser = new formdata(req.body.formdata); 
    await newUser.save();
    console.log(formdata);
})
*/

// show route
app.post("/user/show",async(req,res)=>{
    /*let {id} = req.params;*/
    let formdatas = await formdata.find();
    res.render("pages/show.ejs",{formdatas})
});


// log-in route
app.get("/user/log",async(req,res)=>{
    let formdatas = await formdata.find();
    console.log("working")
    res.render("pages/log-in.ejs",{formdatas})
});


//delete route.
app.get("/user/:id/delete",(req,res)=>{
    let {id} = req.params;
    const user = formdata.findById(id);
    res.render("pages/delete.ejs",{user});
});


//delete the data
app.delete("/user/:id",(req,res)=>{
    let {id} = req.params;
    let {password} = req.body;
    const user = formdata.findById(id);

            if(user.password !== password){
                res.send("wrond password");
            }
            else{
                return true;
            }
});


app.listen(8080,()=>{
    console.log("app is listening on port 8080");
})