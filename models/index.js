const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },

    image:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJYXQooGXIj2Ec4z6K73Kq4pbH5BmwwU_sSBajbBCxvw&s",
        set: (v) => v === "" ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJYXQooGXIj2Ec4z6K73Kq4pbH5BmwwU_sSBajbBCxvw&s":v,              // setting v (value) of image//
    },
    
    password:{
        type:String,
        require:true
    }
});

const formdata = mongoose.model("FormData",formSchema);

module.exports = formdata;

