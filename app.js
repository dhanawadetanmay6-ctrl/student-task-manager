const fs = require("fs");

const task = {
  id: 1,
  task: "Learn Node.js",
  completed: false
};

fs.writeFileSync("tasks.json", JSON.stringify([task], null, 2));

console.log("Task added successfully!");