const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(express.static('static'));

let cors = require('cors');
app.use(cors());

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 },
];

function addNewTask(taskId, text, priority) {
  tasks.push({ taskId: taskId, text: text, priority: priority });
  return tasks;
}

app.get('/tasks/add', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let priority = parseInt(req.query.priority);

  let result = addNewTask(taskId, text, priority);
  res.json(result);
});

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

function sortByPriority(task1, task2) {
  return task1.priority - task2.priority;
}

app.get('/tasks/sort-by-priority', (req, res) => {
  let result = tasks.sort(sortByPriority);

  res.json(result);
});

function updateTaskPriority(taskId, priority) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].priority = priority;
    }
  }
  return tasks;
}

app.get('/tasks/edit-priority', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let priority = parseInt(req.query.priority);

  let result = updateTaskPriority(taskId, priority);

  res.json(result);
});

function updateTaskText(taskId, text) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].text = text;
    }
  }
  return tasks;
}

app.get('/tasks/edit-text', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;

  let result = updateTaskText(taskId, text);

  res.json(result);
});

function deleteTask(task, taskId) {
  return task.taskId != taskId;
}

app.get('/tasks/delete', (req, res) => {
  let taskId = parseInt(req.query.taskId);

  let result = tasks.filter((task) => deleteTask(task, taskId));

  res.json(result);
});

function filterTaskByPriority(task, priority) {
  return task.priority === priority;
}

app.get('/tasks/filter-by-priority', (req, res) => {
  let priority = parseInt(req.query.priority);

  let result = tasks.filter((task) => filterTaskByPriority(task, priority));
  res.json(result);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
