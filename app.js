const fs = require("fs");

// Read tasks
const data = fs.readFileSync("tasks.json", "utf8");
const tasks = JSON.parse(data);

// Find task with ID 1
const task = tasks.find((t) => t.id === 1);

if (task) {
  task.completed = true;

  fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2));

  console.log("Task marked as completed!");
} else {
  console.log("Task not found!");
}