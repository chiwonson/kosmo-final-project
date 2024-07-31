const express = require('express');
const bodyParser = require('body-parser');
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

app.get('/breadAll', (req, res) => {
	console.log("---- selectbAll >>>");
	const sql = "SELECT * FROM B_BBOARD";
	conn.query(sql, function(err, result, fields) {
		if (err) throw err;		
		console.log(result);		
		res.send(result);
	});
});

app.post('/breadone/:bnum', (req, res) => {
	console.log("---- bnum 조건 select >>> : ");
	const sql = "SELECT * FROM B_BBOARD WHERE BNUM = ?";
	conn.query(sql, [req.params.bnum], (err, result, fields) => {
		if (err) throw err;
		console.log("조회 >>> : ", result);
		res.send(result);
	});
});   

// 입력 O
app.post('/write', (req, res) => {
	console.log("---- write >>>");
	const mname = req.body.mname;
  const mid = req.body.mid;
	const rebakery = req.body.rebakery;
	const redate = req.body.redate;
  const retime = req.body.retime;
	const subdate = req.body.subdate;
  const remember = req.body.remember;
	console.log("---- mname >>> : " + mname);
  console.log("---- mid >>> : " + mid);
	console.log("---- rebakery >>> : " + rebakery);
	console.log("---- redate >>> : " + redate);
  console.log("---- retime >>> : " + retime);
	console.log("---- subdate >>> : " + subdate);
	console.log("---- remember >>> : " + remember);

	const sql = "INSERT INTO B_REBOARD SET ? ";
	conn.query(sql, req.body ,function(err, result, fields){
		if (err) throw err;
		console.log(err);
		console.log(result);		
	});
	res.send("success");
});

app.post('/total', (req, res) => {
	console.log("---- sumtot >>>");
	const rebakery = req.body.rebakery;
	const redate = req.body.redate;
  const retime = req.body.retime;
	console.log("---- rebakery >>> : " + rebakery);
	console.log("---- redate >>> : " + redate);
  console.log("---- retime >>> : " + retime);

	const sql = "SELECT SUM(REMEMBER) AS total_sum FROM B_REBOARD WHERE REBAKERY = ? AND REDATE = ? AND RETIME = ?";
	conn.query(sql, [rebakery, redate, retime],function(err, result, fields){
		if (err) throw err;
		console.log(result);
		res.send(result);
	});
});

// 전체 조회
app.get('/board', (req, res) => {
	console.log("---- select >>>");
	const sql = "SELECT * FROM B_REBOARD";
	conn.query(sql, function(err, result, fields) {
		if (err) throw err;		
		console.log(result);		
		res.send(result);
	});
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
	const sql = "DELETE FROM B_REBOARD WHERE mid = ? ";
	conn.query(sql, [req.params.mid], (err, result, fields) => {
		if (err) throw err;
		console.log(result);
		res.redirect('/');
	});
});

app.listen(app.get('port'), () => {
	console.log("Express 서버 시작 포트는 >>> : ", app.get('port'))
});