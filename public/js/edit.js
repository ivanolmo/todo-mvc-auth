const deleteTagBtn = document.querySelectorAll('.delete-tag'); //select all the remove buttons
const removeSubTaskBtn = document.querySelectorAll('.removeSubTaskBtn')

// Loop through each delete subtask button and add eventlistener to delete the input and delete button
removeSubTaskBtn.forEach(el => el.addEventListener('click', function clickevent(e) {
  console.log(e.target.parentNode)
  e.target.parentNode.remove()
}))


Array.from(deleteTagBtn).forEach((el) => {
  // Loop through remove buttons
  el.addEventListener('click', removeTag); // Add event listener to remove buttons
});

async function removeTag() {
  // Create remove tag function
  const tagId = this.parentNode.dataset.tagId; // Get tag id
  const todoId = document.querySelector(`form[data-todo-id]`).dataset.todoId
  try {
    // Try
    const response = await fetch('/todos/removeTag', {
      // Fetch remove tag route
      method: 'put', // Set method to put
      headers: { 'Content-type': 'application/json' }, // Set headers
      body: JSON.stringify({
        // Stringify
        tagId: tagId, // Set tag id
        todoId: todoId
      }),
    });
    const data = await response.json(); // Get response
    if (data) document.querySelector(`div.tag[data-tag-id='${tagId}']`).remove()
  } catch (err) {
    // Catch
    console.error(err); // Log to console
  }
}

async function addTags() {
  const todoId = document.querySelector(`form[data-todo-id]`).dataset.todoId
  const newTags = document.querySelector(`input[name=tags]`)
  if (newTags.value.length) {
    try {
      const tagResponse = await fetch('/tags/createTags', {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          todoId: todoId,
          tags: newTags.value
        })
      })
      const tagResponseJSON = await tagResponse.json()
      const tagIds = JSON.parse(tagResponseJSON).tagIds
      const todoTags = await fetch('/todos/addTags', {
        method: 'put',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          todoId: todoId,
          tags: tagIds
        })
      })
      const todoTagResponseJSON = await todoTags.json()
      const todoTagIds = JSON.parse(todoTagResponseJSON).tagIds
      const existingTags = Array.from(document.querySelectorAll(`div.tag[data-id]`))
      const newTagIds = todoTagIds.filter((el) => !existingTags.find((tag) => tag.dataset.id === el ))
      const tagSection = document.querySelector(`section.tags`)
      newTagIds.forEach(async (el) => {
        const tag = await fetch('/tags/getTag', {
          method: 'put',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({ tagId: el })
        })
        const tagName = await tag.json()
        const newNode = document.querySelector(`div.tag[data-id]`).cloneNode(true)
        newNode.dataset.id = el
        const tagSpan = newNode.querySelector(`span.tagDisplay`)
        tagSpan.dataset.id = el
        tagSpan.innerText = tagName
        const removeBtn = newNode.querySelector(`i.remove-tag`)
        removeBtn.dataset.id = el
        removeBtn.addEventListener('click', removeTag)
        tagSection.appendChild(newNode)
      })
      newTags.value = ''
    } catch (err) {
      console.error(err)
    }
  }
}