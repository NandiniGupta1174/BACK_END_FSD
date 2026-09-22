const http = require("http");
const fs = require("fs");
const querystring = require("querystring");
const PORT = 3000;
const FILE = "students.json";
const server = http.createServer((req, res) => {
   if (req.method === "GET" && req.url === "/") {
      res.writeHead(200, { "Content-Type": "text/html" });
       res.end(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Student Record Form</title>
        </head>
        <body>

            <h2>Student Record Form</h2>

            <form method="POST" action="/addStudent">

                <label>Name:</label><br>
                <input type="text" name="name" required><br><br>

                <label>Roll Number:</label><br>
                <input type="text" name="roll" required><br><br>

                <label>Course:</label><br>
                <input type="text" name="course" required><br><br>

                <label>Email:</label><br>
                <input type="email" name="email" required><br><br>

                <button type="submit">Add Student</button>

            </form>

            <br>

            <a href="/students">View Student Records</a>

        </body>
        </html>
        `);}

    else if (req.method === "POST" && req.url === "/addStudent") {

        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {

            const formData = querystring.parse(body);

            let students = [];

            if (fs.existsSync(FILE)) {
                const data = fs.readFileSync(FILE, "utf8");

                if (data) {
                    students = JSON.parse(data);
                }
            }

            students.push(formData);

            fs.writeFileSync(FILE, JSON.stringify(students, null, 2));

            res.writeHead(302, {
                Location: "/students"
            });

            res.end();
        });

    }

    else if (req.method === "GET" && req.url === "/students") {

        let students = [];

        if (fs.existsSync(FILE)) {
            const data = fs.readFileSync(FILE, "utf8");

            if (data) {
                students = JSON.parse(data);
            }
        }

        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        let html = `
        <html>
        <head>
            <title>Students</title>
        </head>
        <body>

        <h2>Student Records</h2>

        <table border="1" cellpadding="10">
        <tr>
            <th>Name</th>
            <th>Roll No</th>
            <th>Course</th>
            <th>Email</th>
        </tr>
        `;
        students.forEach(student => {
            html += `
            <tr>
                <td>${student.name}</td>
                <td>${student.roll}</td>
                <td>${student.course}</td>
                <td>${student.email}</td>
            </tr>
            `;
        });
        html += `
        </table>
        <br>
        <a href="/">Add Another Student</a>
        </body>
        </html>
        `;
        res.end(html);
    }
      else {
         res.writeHead(404, {
            "Content-Type": "text/plain"
        });

        res.end("404 Page Not Found");
    }

});
server.listen(PORT, () => {
    console.log("Server started successfully on http://localhost:3000");
});