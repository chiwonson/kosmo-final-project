const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const mysql = require('mysql2');
const dbconfig = require('./database.js');
const conn = mysql.createConnection(dbconfig);
const app = express();