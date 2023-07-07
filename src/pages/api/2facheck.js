// import mysql from 'mysql2';

// get user 2fatoken from email

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;
    console.log(email);

    const mysql = require("mysql2");
    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      database: "pizzastore",
    });

    connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      function (err, results, fields) {
        console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        if (results.length > 0) {
          return res.status(200).json(results);
        } else {
          return res.status(200).json({ message: "No user found" });
        }
      }
    );

    // check if 2fatoken field value
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
