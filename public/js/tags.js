const deleteTagBtn = document.querySelectorAll('.delete-tag'); //select all the delete buttons

Array.from(deleteTagBtn).forEach((el) => {
  // Loop through delete buttons
  el.addEventListener('click', deleteTag); // Add event listener to delete buttons
});

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
    location.reload(); // Reload page
  } catch (err) {
    // Catch
    console.log(err); // Log to console
  }
}