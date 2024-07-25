const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const mysql = require('mysql2');
const dbconfig = require('./database.js');
const conn = mysql.createConnection(dbconfig);
const app = express();

app.use(cors({
    origin: "*",                // 출처 허용 옵션
    credentials: true,          // 응답 헤더에 Access-Control-Allow-Credentials 추가
    optionsSuccessStatus: 200,  // 응답 상태 200으로 설정
}))
app.set('port', process.env.PORT || 5001);
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.json({ extended: true }));
app.use('/static', express.static('static'));

// 전체 조회
app.get('/board', (req, res) => {
	console.log("---- select >>> : ");
	const sql = "SELECT * FROM B_REBOARD";
	conn.query(sql, function(err, result, fields) {
		if (err) throw err;		
		console.log(result);		
		res.send(result);
	});
});      

app.get('/breadAll', (req, res) => {
	console.log("---- select >>> : ");
	const sql = "SELECT * FROM B_BBOARD";
	conn.query(sql, function(err, result, fields) {
		if (err) throw err;		
		console.log(result);		
		res.send(result);
	});
});    

// 입력 
app.post('/write', (req, res) => {
	console.log("---- write >>> : ");	
	const mname = req.body.mname;
    const mid = req.body.mid;
	const rebakery = req.body.rebakery;
	const redate = req.body.redate;
    const retime = req.body.retime;
	const subdate = req.body.subdate;
    const remember = req.body.remember;
	const restatus = req.body.restatus;
    const deleteyn = req.body.deleteyn;
	console.log("---- mname >>> : " + mname);
    console.log("---- mid >>> : " + mid);
	console.log("---- rebakery >>> : " + rebakery);
	console.log("---- redate >>> : " + redate);
    console.log("---- retime >>> : " + retime);
	console.log("---- subdate >>> : " + subdate);
    console.log("---- remember >>> : " + remember);
	console.log("---- restatus >>> : " + restatus);
    console.log("---- deleteyn >>> : " + deleteyn);

	const sql = "INSERT INTO B_REBOARD SET ? ";
	conn.query(sql, req.body ,function(err, result, fields){
		if (err) throw err;
		console.log(err);
		console.log(result);		
	});
	res.send("success");
});


// 조회
app.get('/board/:bnum', (req, res) => {
	console.log("---- mid 조건 select >>> : ");
	const sql = "SELECT * FROM B_REBOARD WHERE MID = ?";
	conn.query(sql, [req.params.mid], (err, result, fields) => {
		if (err) throw err;
		console.log("조회 >>> : ", result);
		res.send(result);
	});
});

// 수정
app.post('/update/:mid', (req, res) => {	
	const mid = req.body.mid;
	const redate = req.body.redate;
    const retime = req.body.retime;
	const sql = "UPDATE B_REBOARD SET REDATE = ?, RETIME = ?, SUBDATE = SYSDATE() WHERE MID = '" + mid + "'" ;
	conn.query(sql, [redate, retime], (err, result, fields) => {
		if (err) throw err;
		console.log(result);
		res.redirect('/');
	});
});

// 삭제
app.get('/delete/:id', (req, res) => {
	const sql = "DELETE FROM  B_REBOARD WHERE mid = ? ";
	conn.query(sql, [req.params.mid], (err, result, fields) => {
		if (err) throw err;
		console.log(result);
		res.redirect('/');
	});
});

app.listen(app.get('port'), () => {
	console.log("Express 서버 시작 포트는 >>> : ", app.get('port'))
});