import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config/environment';
const token =  config.getConstants().token.secret
import mysql from 'mysql';
const mysql_options = config.getConstants().mysql;
let connection = mysql.createConnection(mysql_options);

export async function register_new_user (req, res) {
    try {
        const obj = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(obj.Password, salt);
        let query = "INSERT INTO `employees`(`LastName`,`FirstName`,`Title`,`TitleOfCourtesy`,`Email`,`Password`,`BirthDate`,`HireDate`,`Address`,`City`,`Region`,`PostalCode`,`Country`,`HomePhone`,`Extension`,`Photo`,`Notes`,`ReportsTo`,`PhotoPath`,`Salary`) VALUES ('" + obj.LastName + "','" + obj.FirstName + "','" + obj.Title + "','" + obj.TitleOfCourtesy + "','" + obj.Email + "','" + hashPassword + "','" + obj.BirthDate + "','" + obj.HireDate + "','" + obj.Address + "','" + obj.City + "','" + obj.Region + "','" + obj.PostalCode + "','" + obj.Country + "','" + obj.HomePhone + "','" + obj.Extension + "','" + obj.Photo + "','" + obj.Notes + "','" + obj.ReportsTo + "','" + obj.PhotoPath + "','" + obj.Salary + "');";
        connection.query(query, function (error, results, fields) {
            if (error) throw error;
            return res.status(200).json({ message: 'New user added successfully.' });
        });
    } catch(e) {
        console.log(e);
        return res.status(400).json({ message: 'New user addition failed.' });
    }
}

export async function get_user_details (req, res) {
    try {
        let query = "SELECT `EmployeeID`,`LastName`,`FirstName`,`Title`,`TitleOfCourtesy`,`Email`,`BirthDate`,`HireDate`,`Address`,`City`,`Region`,`PostalCode`,`Country`,`HomePhone`,`Extension`,`Photo`,`Notes`,`ReportsTo`,`PhotoPath`,`Salary` FROM `employees` WHERE `EmployeeID` = " + req.params.id
        connection.query(query, function (error, results, fields) {
            if (error) throw error;
            results.forEach(function(a){ delete a.Password });
            return res.status(200).json(results);
        });
    } catch(e) {
        console.log(e);
        return res.status(400).json({ message: 'User details fetch failed.' });
    }
}