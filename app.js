var express = require("express"),
    app     = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

var Bank = require("./models/bank");

mongoose.connect("mongodb://localhost/bankDB");

app.use(bodyParser.urlencoded({extended : true }));
app.use(express.static( __dirname + "/public"));
app.set("view engine","ejs");

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	next();
});

/*Bank.create({
	ifsc : "ABHY0065001",
	bank_id : "60",
	branch : "RTGS-HO",
	address : "ABHYUDAYA BANK BLDG., B.NO.71, NEHRU NAGAR, KURLA (E), MUMBAI-400024",
	city : "MUMBAI",
	district : "GREATER MUMBAI",
	state : "MAHARASHTRA",
	bank_name : "ABHYUDAYA COOPERATIVE BANK LIMITED"
});*/


app.get("/",function(req,res){
	res.redirect("/bankByIfsc");

});
app.get("/bankByIfsc",function(req,res){
	res.render("bankByIfsc",{msg : ""});
});

//handle post logic
app.post("/bankByIfsc",function(req,res){
	var ifsc = req.body.ifsc.toUpperCase();
	Bank.findOne({ifsc : ifsc},function(err,foundBank){
        if(err){
        	console.log(err);
        } else {
        	res.render("showBankByIfsc",{bank : foundBank});
        }
	});
});
app.get("/bankByCity",function(req,res){
	res.render("bankByCity",{msg : ""});
});

app.post("/bankByCity",function(req,res){
	var city = req.body.city.toUpperCase();
	var bank = req.body.bank_name.toUpperCase();
	Bank.find({ city : city, bank_name : bank },function(err,banks){
		if(err){
			console.log(err);
			res.redirect("/bankByCity");
		} else {
			console.log( banks.length);
			res.render("showBankByCity",{banks : banks});
		}
	});
});


app.listen(3000,function(){
	console.log("server has started");
});
