document.addEventListener('DOMContentLoaded', function() {
  loadTasksFromStorage();
});

function loadTasksFromStorage() {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => addTaskToDOM(task));
}

function saveTasksToStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
  let taskInput = document.getElementById('task-input');
  let taskText = taskInput.value.trim();

  if (taskText === '') {
    alert('Please enter a task.');
    return;
  }

  let task = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  addTaskToDOM(task);
  saveTask(task);
  taskInput.value = '';
}

function addTaskToDOM(task) {
  let taskList = document.getElementById('task-list');
  let taskItem = document.createElement('li');
  taskItem.className = 'task-item';
  taskItem.innerHTML = `
    <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTaskCompletion(${task.id})">
    <span>${task.text}</span>
    <button onclick="editTask(${task.id})">Edit</button>
    <button onclick="deleteTask(${task.id})">Delete</button>
  `;
  taskList.appendChild(taskItem);
}

function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  saveTasksToStorage(tasks);
}

function toggleTaskCompletion(taskId) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  let taskIndex = tasks.findIndex(task => task.id === taskId);
  tasks[taskIndex].completed = !tasks[taskIndex].completed;
  saveTasksToStorage(tasks);
}

function editTask(taskId) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let taskIndex = tasks.findIndex(task => task.id === taskId);
    let currentText = tasks[taskIndex].text;
    
    let newText = prompt('Enter new task description:', currentText); 
    if (newText === null || newText.trim() === '') return;
  
    tasks[taskIndex].text = newText;
    saveTasksToStorage(tasks);
    updateTaskDOM(taskId, newText);
  }
  

function updateTaskDOM(taskId, newText) {
  let taskSpan = document.querySelector(`.task-item input[type="checkbox"][onchange="toggleTaskCompletion(${taskId})"]`).nextElementSibling;
  taskSpan.textContent = newText;
}

function deleteTask(taskId) {
  if (confirm('Are you sure you want to delete this task?')) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasksToStorage(tasks);
    removeTaskFromDOM(taskId);
  }
}

function removeTaskFromDOM(taskId) {
  let taskItem = document.querySelector(`.task-item input[type="checkbox"][onchange="toggleTaskCompletion(${taskId})"]`).parentElement;
  taskItem.remove();
}
