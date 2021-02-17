const express = require("express");

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express( );

app.use(bodyParser.urlencoded({extended:true}));


mongoose.connect("mongodb://localhost:27017/detailsdb", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);

const detailsSchema = {
  Name: String,
  Divorce_id: String,
  Date_of_Birth: String,
  Nationality: String,
  Marital_Status: String,
  Highest_Education: String
};

const Detail = mongoose.model("Detail", detailsSchema);


const detail = new Detail({
  Name: null,
  Divorce_id: null,
  Date_of_Birth: null,
  Nationality: null,
  Marital_Status: null,
  Highest_Education: null

});



app.get("/FORM-1",function(req,res)
{

res.sendFile(__dirname+"/form1.html");

});



app.get("/FORM-2",function(req,res)
{
  res.sendFile(__dirname+"/form2.html");
});



app.get("/FORM-3",function(req,res)
{
  res.sendFile(__dirname+"/form3.html");
});



app.post("/FORM-1", function(req, res){
  detail.Name = req.body.name;
  detail.Divorce_id = req.body.id;

  res.redirect("/FORM-2");
});

app.post("/FORM-2", function(req, res){


    detail.Date_of_Birth =  req.body.dob;
    detail.Nationality = req.body.nationality;

    res.redirect("/FORM-3");

});


app.post("/FORM-3", function(req, res){

    detail.Marital_Status= req.body.marital_status;
    detail.Highest_Education=  req.body.highest_education;

    detail.save();

});

app.listen(3000, function(){
  console.log("server started on port 3000");
});
