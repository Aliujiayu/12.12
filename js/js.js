var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var jade = require("jade");
var path = require("path");
var fs = require("fs");
var multer = require("multer");
var app = express();
var user = express.Router();

app.use(bodyParser.urlencoded({}));
app.use(multer({
	dest: "./../www/images"
}).any());
app.use("/user", user);

var pool = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "123456",
	database: "app",
	port: "3306"
})
app.get("", function(req, res) {
	var str = jade.renderFile("./../www/1.jade", {
		pretty: true
	});
	res.send(str);
})
//注册
user.post("/login", function(req, res) {
	var user = req.body.user;
	var pass = req.body.pass;
	pool.getConnection(function(err, connection) {
		if(err) {
			console.log("connectionlogin::::::::::" + err);
		}
		connection.query("select * from login where user=?", [user], function(err, data) {
			if(err) {
				console.log("mysql40::::::::" + err);
			}
			if(data == "") {
				connection.query("insert into login(user,pass) values(?,?)", [user, pass], function(err, data) {
					if(err) {
						console.log("mysql45::::::::" + err);
					}
					res.send("注册成功");
				})
			} else {
				res.send("用户名已存在");
			}
			connection.end();
		})
	})
})

//登录
user.post("/login1", function(req, res) {
	var user = req.body.user;
	var pass = req.body.pass;
	pool.getConnection(function(err, connection) {
		if(err) {
			console.log("connection63::::::::::" + err);
		}
		connection.query("select * from login where user=?", [user], function(err, data) {
			if(err) {
				console.log("mysql::::::::67" + err);
			}
			if(data == "") {
				res.send("用户名不存在");
			} else {
				if(data[0].pass == pass) {
					res.send("登录成功");
				} else {
					res.send("用户名或者密码错误");
				}
			}
			connection.end();
		})
	})
})
//注册发布
user.get("/zfabu", function(req, res) {
	var jg = req.query.jg;
	console.log(jg);
	if(jg == "用户名已存在") {
		console.log("83" + jg);
	} else {
		console.log("85" + jg);
		var str = jade.renderFile("./../www/2.jade", {
			pretty: true
		});
		res.send(str);
	}
})

user.post("/img", function(req, res) {
	var img = req.files[0];
	var name = img.filename;
	var newname = name + path.parse(img.originalname).ext;
	fs.rename("./../www/images/" + name, "./../www/images/" + newname, function(err) {
		if(err) {
			console.log(err);
			return
		}
		res.send('http://localhost:8000/images/' + newname);
	})
})
user.get("/zczq",function(req,res){
	var name = req.query.name;
	var sex = req.query.sex;
	var tel = req.query.tel;
	var ip = req.query.ip;
	var qq = req.query.qq;
	var email = req.query.email;
	var img = req.query.img;
	pool.getConnection(function(err, connection) {
		if(err) {
			console.log("connection119::::::::::" + err);
		}
		connection.query("insert into xqz(name,sex,tel,ip,qq,email,img) values(?,?,?,?,?,?,?)", [name,sex,tel,ip,qq,email,img], function(err, data) {
			if(err) {
				console.log("mysql::::::::123" + err);
			}
			res.send(data);
			connection.end();
		})
	})
})
//登录发布
user.get("/dfabu", function(req, res) {
	var str = jade.renderFile("./../www/3.jade", {
		pretty: true
	});
	res.send(str);
})
app.use(express.static("./../www"));
app.listen(8000, function() {
	console.log("启动........");
})