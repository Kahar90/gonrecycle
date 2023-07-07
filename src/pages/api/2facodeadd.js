export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, token, permission } = req.body;
    console.log(email);

    const mysql = require("mysql2");
    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      database: "pizzastore",
    });

    //   insert token, email, permission
    connection.query(
      "INSERT INTO users (email, token, permission) VALUES (?, ?, ?)",
      [email, token, permission],
      function (err, results, fields) {
        console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        return res.status(200).json(results);
      }
    );
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
