import mysql from 'mysql';
import config from '../../config/environment';
const mysql_options = config.getConstants().mysql;
let connection = mysql.createConnection(mysql_options);

export async function create_user_table () {
    try {
        connection.query("SHOW TABLES LIKE 'employees'", function (error, results, fields) {
            if (error) throw error;
            else {
                if(results.length == 0) {
                    connection.query('CREATE TABLE `employees` ( `EmployeeID` int(11) NOT NULL AUTO_INCREMENT, `LastName` varchar(20) NOT NULL, `FirstName` varchar(10) NOT NULL, `Title` varchar(30) DEFAULT NULL, `TitleOfCourtesy` varchar(25) DEFAULT NULL, `Email` varchar(100) NOT NULL, `Password` varchar(100) NOT NULL, `BirthDate` datetime DEFAULT NULL, `HireDate` datetime DEFAULT NULL, `Address` varchar(60) DEFAULT NULL, `City` varchar(15) DEFAULT NULL, `Region` varchar(15) DEFAULT NULL, `PostalCode` varchar(10) DEFAULT NULL, `Country` varchar(15) DEFAULT NULL, `HomePhone` varchar(24) DEFAULT NULL, `Extension` varchar(4) DEFAULT NULL, `Photo` longblob, `Notes` mediumtext NOT NULL, `ReportsTo` int(11) DEFAULT NULL, `PhotoPath` varchar(255) DEFAULT NULL, `Salary` float DEFAULT NULL, PRIMARY KEY (`EmployeeID`), KEY `LastName` (`LastName`), KEY `PostalCode` (`PostalCode`), KEY `FK_Employees_Employees` (`ReportsTo`) )', function (error, results, fields) {
                        if (error) throw error;
                        else console.log('User table schema initialized');
                    });
                }
            }
        });
    } catch(e) {
        console.log(e);
    }
}