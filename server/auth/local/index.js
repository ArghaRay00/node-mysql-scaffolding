import express from 'express';
var router = express.Router();
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config/environment';
import mysql from 'mysql';
const mysql_options = config.getConstants().mysql;
let connection = mysql.createConnection(mysql_options);

router.post("/", async (req, res) => {
  try {
    let query = "SELECT `EmployeeID`,`LastName`,`FirstName`,`TitleOfCourtesy`,`Email`,`Password` FROM `employees` WHERE `Email` = '" + req.body.email + "'";
    connection.query(query, async function (error, results, fields) {
      if (error) throw error;
      if (results.length == 0) throw error;
      const validPassword = await bcrypt.compare(
        req.body.password,
        results[0].Password
      );
      if (!validPassword) throw error;
      const token = jwt.sign({ EmployeeID: results[0].EmployeeID }, config.getConstants().token.secret, { expiresIn: '30d' });
      return res.status(200).json({ token: token });
    });
  } catch(e) {
    console.log(e);
    return res.status(400).json({ message: 'Invalid credentials entered.' });
  }
});

export default router;