const mongoose = require("mongoose");
const initData = require("./data.js"); /* wait*/
const formdata = require("../models/index.js"); /*wait*/

main()
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err);
    console.log("db err")
});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/Advisoropedia");
};


const initDB = async()=>{                             //initialising db//
    await formdata.deleteMany({});                     // first empty the db before initilaise//
    await formdata.insertMany(initData.data);           // then inserting data to db//
    console.log("data was initialised");
    console.log("data was initialised");
}
initDB();