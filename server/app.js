import express from 'express';
const app = express();
import mysql from 'mysql';
import config from './config/environment';
import initialize_database from './config/seed';
import registerRoutes from './routes';
import cors from 'cors';
const mysql_options = config.getConstants().mysql;
require('dotenv').config();

let connection = mysql.createConnection(mysql_options);
connection.connect(function(err) {
    if (err) throw err;
    console.log("UMSP database connected successfully.");
    initialize_database();
});

app.use(cors());
app.use(express.json());

registerRoutes(app);

app.listen(config.getPort(),()=>{
    console.log("Server is running on port " + config.getPort());
});