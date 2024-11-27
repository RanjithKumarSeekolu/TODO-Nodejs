const fs = require("fs");

const TASKS_FILE = "tasks.json";

// Load tasks from the file
const loadTasks = () => {
  if (!fs.existsSync(TASKS_FILE)) return [];
  const data = fs.readFileSync(TASKS_FILE, "utf-8");
  return JSON.parse(data);
};

// Save tasks to the file
const saveTasks = (tasks) => {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
};

// Add a new task
const addTask = (description) => {
  const tasks = loadTasks();
  tasks.push({ description, completed: false });
  saveTasks(tasks);
  console.log(`Task added: "${description}"`);
};

// View tasks
const viewTasks = () => {
  const tasks = loadTasks();
  console.log("\nYour Tasks:");
  tasks.forEach((task, index) => {
    const status = task.completed ? "[✔]" : "[ ]";
    console.log(`${index + 1}. ${status} ${task.description}`);
  });
};

// Mark a task as complete
const completeTask = (index) => {
  const tasks = loadTasks();
  if (tasks[index]) {
    tasks[index].completed = true;
    saveTasks(tasks);
    console.log(`Task marked as complete: "${tasks[index].description}"`);
  } else {
    console.log("Task not found!");
  }
};

// Delete a task
const deleteTask = (index) => {
  const tasks = loadTasks();
  if (tasks[index]) {
    const removed = tasks.splice(index, 1);
    saveTasks(tasks);
    console.log(`Task deleted: "${removed[0].description}"`);
  } else {
    console.log("Task not found!");
  }
};

// Perform all steps sequentially
const runDemo = () => {
  console.log("Starting ToDo CLI Demo...\n");

  // Step 1: Add a task
  addTask("Sample Task 1");
  addTask("Sample Task 2");

  // Step 2: View tasks
  console.log("\n--- View Tasks ---");
  viewTasks();

  // Step 3: Mark the first task as complete
  console.log("\n--- Mark First Task as Complete ---");
  completeTask(0);

  // Step 4: View updated tasks
  console.log("\n--- View Updated Tasks ---");
  viewTasks();

  // Step 5: Delete the first task
  console.log("\n--- Delete First Task ---");
  deleteTask(0);

  // Step 6: View tasks after deletion
  console.log("\n--- View Tasks After Deletion ---");
  viewTasks();

  console.log("\nDemo Complete!");
};

// Run the demo
runDemo();
