
const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');
app.use(cors());


const bodyParser = require('body-parser');


app.use(express.static('abc'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
//whether you want nested objects support  or not

let dbparams = {
	host:'localhost',
	user:'root',
	password:'cdac',
	database:'please',
	port:3306
}

const con = mysql.createConnection(dbparams);


// ============================sir's=================================
var result;

// app.post('/poc1', function (req, res) {
	
// 		console.log("reading input " + req.body.v1 +  "  second " + req.body.v2)
		
//     	var xyz ={ v1:37, v2:35};
//         res.send(xyz);
//     });

// ======================================================================

app.get('/getdetails',(req, res) =>{
    
		console.log('inside getdetails');
		let bid = req.query.bid;
        console.log("connection succeed");
		
		let output = {status:false,details : {bid:0,bname:"",bprice:0}}

		con.query('select * from book where bid = ?',[bid],
		(error,rows)=>{
			if(error){
				console.log("Some error"+error);
			}
			else{
				if(rows.length>0){
					output.status=true;
					output.details = row[0];
				}
				else{
					console.log("Book not found");
				}
				
			}
			res.send(output);
		});

		});

app.get("/update",(req,res)=>{
	console.log("Reached here in update");

	let details = {bid:req.query.bid,bname:req.query.bname,bprice:req.query.bprice}
	let output = {status: false}
	
	con.query('update book set bid = ?,bname = ?,bprice = ?',
	[details.bid,details.bname,details.bprice],
	(error,ress)=>{
		if(error){
			console.log(error);
		}
		else{
			if(ress.affectedrows>0){
				console.log("Update successfull...");
				output.status = true;
			}
			else{
				console.log("Update failed");
			}
		}
		res.send(output);
	});
});


app.listen(900, function () {
    console.log("server listening at port 900...");
});