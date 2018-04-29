var mongoose = require("mongoose");


var bankSchema = new mongoose.Schema({
	ifsc : String,
	bank_id : String,
	branch : String,
	address : String,
	city : String,
	district : String,
	state : String,
	bank_name : String
});

var Bank = mongoose.model("Bank",bankSchema);

module.exports = Bank;