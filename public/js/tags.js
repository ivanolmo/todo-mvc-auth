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

async function deleteTag() {
  // Create delete tag function
  const tagId = this.parentNode.dataset.id; // Get tag id
  try {
    // Try
    const response = await fetch('tags/deleteTag', {
      // Fetch delete tag route
      method: 'delete', // Set method to delete
      headers: { 'Content-type': 'application/json' }, // Set headers
      body: JSON.stringify({
        // Stringify
        tagId: tagId, // Set tag id
      }),
    });
    const data = await response.json(); // Get response
    console.log(data); // Log to console
    this.parentNode.parentNode.remove();
  } catch (err) {
    // Catch
    console.log(err); // Log to console
  }
}

function editTag() {
  // Create edit tag function
  const tagId = this.parentNode.dataset.id; // Get tag id
  document.querySelector(`div.tagDisplayContainer[data-id='${tagId}']`).classList.add('hidden') // Hide the display container
  document.querySelector(`div.tagEditContainer[data-id='${tagId}']`).classList.remove('hidden') // Display the edit container
}

async function saveEdit() {
    // Create save tag function
    const tagId = this.parentNode.dataset.id; // Get tag id
    const tag = document.querySelector(`input[data-id='${tagId}']`).value // Get tag value from text input
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
      console.log(data); // Log to console
      document.querySelector(`div.tagDisplayContainer[data-id='${tagId}']`).classList.remove('hidden') // Hide the display container
      document.querySelector(`div.tagEditContainer[data-id='${tagId}']`).classList.add('hidden') // Display the edit container
      document.querySelector(`span.tagDisplay[data-id='${tagId}']`).innerText = tag
    } catch (err) {
      // Catch
      console.log(err); // Log to console
    }
}

function cancelEdit() {
  const tagId = this.parentNode.dataset.id; // Get tag id
  document.querySelector(`div.tagDisplayContainer[data-id='${tagId}']`).classList.remove('hidden') // Hide the display container
  document.querySelector(`div.tagEditContainer[data-id='${tagId}']`).classList.add('hidden') // Display the edit container
}