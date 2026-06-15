const fs = require("fs");

// Read tasks from tasks.json
const data = fs.readFileSync("tasks.json", "utf8");

// Convert JSON text to JavaScript object
const tasks = JSON.parse(data);

console.log("===== TASKS =====");

// Display all tasks
tasks.forEach((task) => {
  const status = task.completed ? "Done" : "Pending";

  console.log(`${task.id}. ${task.task} [${status}]`);
});