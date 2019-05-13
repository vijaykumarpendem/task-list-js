const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', getTasks);
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeTask);
  clearBtn.addEventListener('click', clearTasks);
  filter.addEventListener('keyup', filterTasks);
}

function getTasks() {
  let tasks = getTasksFromStorage();

  tasks.forEach(function(task) {
    addTaskToList(task);
  })
}

// Add tasks
function addTask(e) {
  e.preventDefault();
  if(taskInput.value.trim() === '') {
    alert('Add a task');
  }
  addTaskToList(taskInput.value);
  storeTaskInLocalStorage(taskInput.value);
  taskInput.value = '';
}

function addTaskToList(task) {
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(task));
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = "<i class='fa fa-remove'></i>";
  li.appendChild(link);
  taskList.appendChild(li);
}

function storeTaskInLocalStorage(task) {
  let tasks = getTasksFromStorage();
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are your sure?')) {
      e.target.parentElement.parentElement.remove();
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

function removeTaskFromLocalStorage(taskItem) {
  let tasks = getTasksFromStorage();
  let updatedTasks = tasks.filter((task)=>taskItem.textContent!== task);
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

function getTasksFromStorage() {
  let tasks = [];
  if(localStorage.getItem('tasks') === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  return tasks;
}

function clearTasks() {
  if(confirm('Are you sure?')) {
    while(taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  }
  localStorage.removeItem('tasks');
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item')
    .forEach(function(task) {
      const item = task.firstChild.textContent;
      if(item.toLowerCase().indexOf(text) !== -1) {
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
    })
}
