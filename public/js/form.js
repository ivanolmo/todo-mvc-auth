function validateForm() {
  const todoItem = document.getElementById('todoItem');
  const dueDate = document.getElementById('dueDate');

  if (todoItem.value === '') {
    alert('Todo item is required');
    todoItem.focus();
    todoItem.style.border = '1px solid red';
    return false;
  }

  if (dueDate.value === '') {
    alert('Due date and time is required');
    dueDate.focus();
    dueDate.style.border = '1px solid red';
    return false;
  }
}
