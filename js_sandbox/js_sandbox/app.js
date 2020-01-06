// Define UI variables
const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')
//Load all event listeners
loadEventListeners()

function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', getTasks)
  form.addEventListener('submit', addTask)
  taskList.addEventListener('click', removeTask)
  clearBtn.addEventListener('click', clearTasks)
  filter.addEventListener('keyup', filterTasks)
}

function getTasks() {
  if (localStorage.getItem('tasks') === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(task => {
    const li = document.createElement('li')
    li.className = 'collection-item'
    li.appendChild(document.createTextNode(task))

    const link = document.createElement('a')
    link.className = 'delete-item secondary-content'
    link.innerHTML = '<i class="fa fa-remove"></i>'

    li.appendChild(link)
    taskList.appendChild(li)
  })
}

function addTask(event) {
  if (taskInput.value === '') {
    alert('Add a task')
  }

  const li = document.createElement('li')
  li.className = 'collection-item'
  li.appendChild(document.createTextNode(taskInput.value))

  const link = document.createElement('a')
  link.className = 'delete-item secondary-content'
  link.innerHTML = '<i class="fa fa-remove"></i>'

  li.appendChild(link)
  taskList.appendChild(li)
  storeTaskInLocalStorage(taskInput.value)

  taskInput.value = ''

  event.preventDefault()
}

function storeTaskInLocalStorage(task) {
  let tasks
  if (localStorage.getItem('tasks') === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.push(task)

  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function removeTask(event) {
  if (event.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      event.target.parentElement.parentElement.remove()

      removeTaskFromLocalStorage( event.target.parentElement.parentElement)
    }
  }
}

function removeTaskFromLocalStorage(taskItem) {
  if (localStorage.getItem('tasks') === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach((task, index) => {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1)
    } 
  })
  localStorage.setItem('tasks', JSON.stringify(tasks))

}

function clearTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild)
  }

  localStorage.clear()
}

function filterTasks(event) {
  const text = event.target.value.toLowerCase()

  document.querySelectorAll('.collection-item').forEach(function (task) {
    const item = task.firstChild.textContent
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block'
    } else {
      task.style.display = 'none'
    }
  })
}