const deleteBtn = document.querySelectorAll('.del'); //select all the delete buttons
const todoItem = document.querySelectorAll('span.not'); // Select all the todo items
const toggleDetailsBox = document.querySelectorAll('span.detailsBtn'); // Select all the toggle details checkboxes
const todoComplete = document.querySelectorAll('span.completed'); // Select all the completed todo items
const addSubTaskBtn = document.getElementById('addSubTaskBtn'); // button for adding additional subtasks
const userPrefs = JSON.parse(localStorage.getItem('userPrefs')) || {}; // get user preferences from local storage

if (addSubTaskBtn) {
  addSubTaskBtn.addEventListener('click', addSubTasks);
}

if (userPrefs.darkMode) {
  document.body.classList.add('dark-mode');
}

function darkMode() {
  // Create dark mode function
  var element = document.body; // Get body element
  element.classList.toggle('dark-mode'); // Toggle dark mode class
  userPrefs.darkMode = element.classList.contains('dark-mode');
  localStorage.setItem('userPrefs', JSON.stringify(userPrefs));
}

Array.from(deleteBtn).forEach((el) => {
  // Loop through delete buttons
  el.addEventListener('click', deleteTodo); // Add event listener to delete buttons
});

Array.from(todoItem).forEach((el) => {
  // Loop through todo items
  el.addEventListener('click', markComplete); // Add event listener to todo items
});

Array.from(todoComplete).forEach((el) => {
  // Loop through completed todo items
  el.addEventListener('click', markIncomplete); // Add event listener to completed todo items
});

Array.from(toggleDetailsBox).forEach((el) => {
  // Loop through toggle details buttons
  el.addEventListener('click', toggleDetails); // Add event listener to toggle details buttons
});

async function deleteTodo() {
  // Create delete todo function
  const todoId = this.parentNode.parentNode.parentNode.dataset.id; // Get todo id
  try {
    // Try
    const response = await fetch('todos/deleteTodo', {
      // Fetch delete todo route
      method: 'delete', // Set method to delete
      headers: { 'Content-type': 'application/json' }, // Set headers
      body: JSON.stringify({
        // Stringify
        todoIdFromJSFile: todoId, // Set todo id
      }),
    });
    const data = await response.json(); // Get response
    console.log(data); // Log to console
    location.reload(); // Reload page
  } catch (err) {
    // Catch
    console.log(err); // Log to console
  }
}

async function markComplete() {
  // Create mark complete function
  const todoId = this.parentNode.dataset.id; // Get todo id
  try {
    // Try
    const response = await fetch('todos/markComplete', {
      // Fetch mark complete route
      method: 'put', // Set method to put
      headers: { 'Content-type': 'application/json' }, // Set headers
      body: JSON.stringify({
        // Stringify
        todoIdFromJSFile: todoId, // Set todo id
      }),
    });
    const data = await response.json(); // Get response
    console.log(data); // Log to console
    location.reload(); // Reload page
  } catch (err) {
    // Catch
    console.log(err); // Log to console
  }
}

async function markIncomplete() {
  // Create mark incomplete function
  const todoId = this.parentNode.dataset.id; // Get todo id
  try {
    // Try
    const response = await fetch('todos/markIncomplete', {
      // Fetch mark incomplete route
      method: 'put', // Set method to put
      headers: { 'Content-type': 'application/json' }, // Set headers
      body: JSON.stringify({
        // Stringify
        todoIdFromJSFile: todoId, // Set todo id
      }),
    });
    const data = await response.json(); // Get response
    console.log(data); // Log to console
    location.reload(); // Reload page
  } catch (err) {
    // Catch
    console.log(err); // Log to console
  }
}

function toggleDetails() {
  const todoId = this.parentNode.parentNode.dataset.id; // Get todo id
  const todo = document.querySelector(`[data-id="${todoId}"]`); // Get parent li node with the specified id
  const todoDetails = todo.querySelector('.todoDetails'); // Get todo details inside the parent li node
  if (todoDetails.style.display === 'block') {
    // If todo details are displayed
    todoDetails.style.display = 'none'; // Hide todo details
  } else {
    // Else
    todoDetails.style.display = 'block'; // Show todo details
  }
}

function addSubTasks() {
  const subTasksDiv = document.querySelector('.addSubTask'); // select div that contains subtasks
  const subTaskItem = document.querySelector('.subTaskItem').cloneNode(true); // clone first subtask item

  subTaskItem.childNodes[1].value = ''; // clear input value if any
  subTasksDiv.appendChild(subTaskItem); // appends new input into the subTasks div
  subTaskItem.childNodes[1].focus(); // auto focus on the new input
}

function delSubTask(el) {
  const subTasksDiv = document.querySelector('.addSubTask'); // select div that contains subtasks
  const subTaskItem = el.closest('div.subTaskItem'); // select the subtask item div to be deleted

  if (subTasksDiv.childElementCount > 1) {
    subTaskItem.remove(); // remove item if there is more than one
  }
}
