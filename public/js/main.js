const deleteBtn = document.querySelectorAll('.del') //select all the delete buttons
const todoItem = document.querySelectorAll('span.not') // Select all the todo items
const todoComplete = document.querySelectorAll('span.completed') // Select all the completed todo items

Array.from(deleteBtn).forEach((el) => { // Loop through delete buttons
    el.addEventListener('click', deleteTodo) // Add event listener to delete buttons
})

Array.from(todoItem).forEach((el) => { // Loop through todo items
    el.addEventListener('click', markComplete) // Add event listener to todo items
})

Array.from(todoComplete).forEach((el) => { // Loop through completed todo items
    el.addEventListener('click', markIncomplete) // Add event listener to completed todo items
})

async function deleteTodo() { // Create delete todo function
    const todoId = this.parentNode.dataset.id // Get todo id
    try { // Try
        const response = await fetch('todos/deleteTodo', { // Fetch delete todo route
            method: 'delete', // Set method to delete
            headers: { 'Content-type': 'application/json' }, // Set headers
            body: JSON.stringify({ // Stringify
                'todoIdFromJSFile': todoId // Set todo id
            })
        })
        const data = await response.json() // Get response
        console.log(data) // Log to console
        location.reload() // Reload page
    } catch (err) { // Catch
        console.log(err) // Log to console
    }
}

async function markComplete() { // Create mark complete function
    const todoId = this.parentNode.dataset.id // Get todo id
    try { // Try
        const response = await fetch('todos/markComplete', { // Fetch mark complete route
            method: 'put', // Set method to put
            headers: { 'Content-type': 'application/json' }, // Set headers
            body: JSON.stringify({ // Stringify
                'todoIdFromJSFile': todoId // Set todo id
            })
        })
        const data = await response.json() // Get response
        console.log(data) // Log to console
        location.reload() // Reload page
    } catch (err) { // Catch
        console.log(err) // Log to console
    }
}

async function markIncomplete() { // Create mark incomplete function
    const todoId = this.parentNode.dataset.id // Get todo id
    try { // Try
        const response = await fetch('todos/markIncomplete', { // Fetch mark incomplete route
            method: 'put', // Set method to put
            headers: { 'Content-type': 'application/json' }, // Set headers
            body: JSON.stringify({ // Stringify
                'todoIdFromJSFile': todoId // Set todo id
            })
        })
        const data = await response.json() // Get response
        console.log(data) // Log to console
        location.reload() // Reload page
    } catch (err) { // Catch
        console.log(err) // Log to console
    }
}