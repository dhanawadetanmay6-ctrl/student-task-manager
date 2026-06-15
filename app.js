const fs = require("fs");

const data = fs.readFileSync("tasks.json", "utf8");
const tasks = JSON.parse(data);

const updatedTasks = tasks.filter((task) => task.id !== 1);

fs.writeFileSync("tasks.json", JSON.stringify(updatedTasks, null, 2));

console.log("Task deleted successfully!");