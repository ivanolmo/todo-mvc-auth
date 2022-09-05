const deleteTagBtn = document.querySelectorAll('.delete-tag'); //select all the delete buttons
const editTagBtn = document.querySelectorAll('.edit-tag'); //select all the edit buttons
const saveEditBtn = document.querySelectorAll('.save-edit'); // Select all the save edit buttons
const cancelEditBtn = document.querySelectorAll('.cancel-edit'); // Select all the cancel edit buttons

Array.from(deleteTagBtn).forEach((el) => {
  // Loop through delete buttons
  el.addEventListener('click', deleteTag); // Add event listener to delete buttons
});

Array.from(editTagBtn).forEach((el) => {
  // Loop through edit buttons
  el.addEventListener('click', editTag); // Add event listener to edit buttons
})

Array.from(saveEditBtn).forEach((el) => {
  el.addEventListener('click', saveEdit); // Add event listeners to save edit buttons
})

Array.from(cancelEditBtn).forEach((el) => {
  el.addEventListener('click', cancelEdit); // Add event listeners to cancel edit buttons
})

document.querySelector('button#addTags')?.addEventListener('click', addTags)

async function addTags() {
  const tags = document.querySelector('input#newTags')
  if (tags.value.length) {
    try {
      const tagResult = await fetch('/tags/createTags', {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          tags: tags.value
        }),
      })
      location.reload(); // Reload page
    } catch (err) {
      console.error(err);
    }
  }
}

async function deleteTag() {
  // Create delete tag function
  const tagId = this.parentNode.dataset.tagId; // Get tag id
  try {
    // Try
    await fetch('/todos/deleteTag', { // Delete tag from all todos first
      method: 'delete',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        tagId: tagId
      })
    })
    await fetch('tags/deleteTag', { // Then delete tag itself
      // Fetch delete tag route
      method: 'delete', // Set method to delete
      headers: { 'Content-type': 'application/json' }, // Set headers
      body: JSON.stringify({
        tagId: tagId, // Set tag id
      }),
    });
    this.parentNode.parentNode.remove();
  } catch (err) {
    // Catch
    console.error(err); // Log to console
  }
}

function editTag() {
  // Create edit tag function
  const tagId = this.parentNode.dataset.tagId; // Get tag id
  document.querySelector(`div.tagDisplayContainer[data-tag-id='${tagId}']`).classList.add('hidden') // Hide the display container
  document.querySelector(`div.tagEditContainer[data-tag-id='${tagId}']`).classList.remove('hidden') // Display the edit container
}

async function saveEdit() {
    // Create save tag function
    const tagId = this.parentNode.dataset.tagId; // Get tag id
    const tag = document.querySelector(`input[data-tag-id='${tagId}']`).value // Get tag value from text input
    try {
      // Try
      const response = await fetch('tags/updateTag', {
        // Fetch delete tag route
        method: 'put', // Set method to delete
        headers: { 'Content-type': 'application/json' }, // Set headers
        body: JSON.stringify({
          // Stringify
          tagId: tagId, // Set tag id
          tag: tag // Set tag data
        }),
      });
      const data = await response.json(); // Get response
      document.querySelector(`div.tagDisplayContainer[data-tag-id='${tagId}']`).classList.remove('hidden') // Hide the display container
      document.querySelector(`div.tagEditContainer[data-tag-id='${tagId}']`).classList.add('hidden') // Display the edit container
      document.querySelector(`span.tagDisplay[data-tag-id='${tagId}']`).innerText = tag
    } catch (err) {
      // Catch
      console.error(err); // Log to console
    }
}

function cancelEdit() {
  const tagId = this.parentNode.dataset.tagId; // Get tag id
  document.querySelector(`div.tagDisplayContainer[data-tag-id='${tagId}']`).classList.remove('hidden') // Hide the display container
  document.querySelector(`div.tagEditContainer[data-tag-id='${tagId}']`).classList.add('hidden') // Display the edit container
}