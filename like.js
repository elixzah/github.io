// Function to fetch the content of the GitHub Gist file
function fetchLikeCount() {
    fetch('https://gist.githubusercontent.com/elixzah/85b670b23351bf4aaa1e6c37a1a29606/raw/like.txt')
        .then(response => response.text())
        .then(data => {
            // Update the like count value in the HTML
            document.getElementById('like_count_value').textContent = data;
        })
        .catch(error => console.error('Error fetching like count:', error));
}

// Function to update the like count in the GitHub Gist file
function updateLikeCount(newCount) {
    const gistUrl = 'https://gist.github.com/elixzah/85b670b23351bf4aaa1e6c37a1a29606';
    fetch(gistUrl)
        .then(response => response.json())
        .then(data => {
            // Update the content of the Gist file with the new like count
            const updatedFileContent = {
                ...data.files,
                'like.txt': {
                    filename: 'like.txt',
                    content: newCount.toString()
                }
            };

            fetch(gistUrl, {
                method: 'PATCH',
                body: JSON.stringify({
                    files: updatedFileContent
                }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer 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' // Add your GitHub token here
                }
            })
            .then(() => console.log('Like count updated successfully'))
            .catch(error => console.error('Error updating like count:', error));
        })
        .catch(error => console.error('Error fetching Gist details:', error));
}

// Call the fetchLikeCount function when the page loads
window.onload = fetchLikeCount;

// Add event listener to the like button
document.getElementById('like_button').addEventListener('click', function() {
    // Get current like count
    let currentCount = parseInt(document.getElementById('like_count_value').textContent);
    // Increment like count
    currentCount++;
    // Update like count in HTML
    document.getElementById('like_count_value').textContent = currentCount;
    // Update like count in GitHub Gist file
    updateLikeCount(currentCount);
});
