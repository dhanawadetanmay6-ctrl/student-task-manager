const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  let tasks = [];

  if (fs.existsSync("tasks.json")) {
    tasks = JSON.parse(fs.readFileSync("tasks.json"));
  }

  let taskList = tasks
    .map(
      (task) => `
      <li>
        ${task.task}
        <a class="delete" href="/delete/${task.id}">❌ Delete</a>
      </li>
    `
    )
    .join("");

  res.send(`
<!DOCTYPE html>
<html>
<head>
<title>Student Task Manager</title>

<style>
body{
  font-family: Arial, sans-serif;
  background:#f4f7fc;
  display:flex;
  justify-content:center;
  align-items:center;
  min-height:100vh;
}

.container{
  background:white;
  width:500px;
  padding:30px;
  border-radius:15px;
  box-shadow:0 5px 15px rgba(0,0,0,0.2);
}

h1{
  text-align:center;
  color:#2563eb;
}

form{
  display:flex;
  gap:10px;
}

input{
  flex:1;
  padding:10px;
  border:1px solid #ccc;
  border-radius:8px;
}

button{
  background:#2563eb;
  color:white;
  border:none;
  padding:10px 15px;
  border-radius:8px;
  cursor:pointer;
}

ul{
  list-style:none;
  padding:0;
}

li{
  background:#f8fafc;
  margin:10px 0;
  padding:12px;
  border-radius:8px;
  display:flex;
  justify-content:space-between;
}

.delete{
  color:red;
  text-decoration:none;
}

.counter{
  color:#666;
}
</style>

</head>

<body>

<div class="container">

<h1>📚 Student Task Manager</h1>

<p class="counter">Total Tasks: ${tasks.length}</p>

<form action="/add" method="POST">
<input type="text" name="task" placeholder="Enter your task" required>
<button type="submit">Add Task</button>
</form>

<h2>My Tasks</h2>

<ul>
${taskList}
</ul>

</div>

</body>
</html>
`);
});

app.post("/add", (req, res) => {
  let tasks = [];

  if (fs.existsSync("tasks.json")) {
    tasks = JSON.parse(fs.readFileSync("tasks.json"));
  }

  tasks.push({
    id: Date.now(),
    task: req.body.task,
  });

  fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2));

  res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
  let tasks = JSON.parse(fs.readFileSync("tasks.json"));

  tasks = tasks.filter((task) => task.id != req.params.id);

  fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2));

  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});