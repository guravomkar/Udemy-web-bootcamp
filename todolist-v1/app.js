//jshint esversion:6

const express  =require("express");
const bodyParser=require("body-parser");
const mongoose =require();
const date =require(__dirname+"/date.js");

console.log(date);

const app=express();


let workItems=[];


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser: true});

const itemsSchema={
    name:String
};

const Item = mongoose.model("Item",itemsSchema);

const item1= new Item({
    name:"welcome to your todolist."
   });

const item2= new Item({
 name:"hit the + button to add a new item."
});

const item3= new Item({
    name:"<-- hit this to delete an item."
   });

const defaultItems =[item1,item2,item3];

Item.insertMany(defaultItems,function(err){
    if(err)
    {
        console.log(err);
    }
    else
    {
      console.log("sucessfully  saved to the database")
    }
})

app.get("/",function(req,res)
{
    Item.find({}, function(err,foundItems)
    {
        res.render("list",{listTitle:"Today",newlistitems:items});
    });
    
    

});

app.post("/",function(req,res){
let item =req.body.newItem;
if(req.body.list === "work"){
    workItems.push(item);
    res.redirect("/work");

}else{
    items.push(item);
    res.redirect("/");
}

 res.redirect("/");
});

app.get("/work",function(req,res){
    res.render("list",{listTitle:"work list",newlistitems:workItems});

});

app.get("/about",function(req,res){
    res.render("about");

});
app.post("/work",function(req,res)
{
    let item=req.body.newItem;
    workitems.push(item);
    res.redirect("/work");

});

app.listen(3000,function()
{
    console.log("server started on port 3000");
});




