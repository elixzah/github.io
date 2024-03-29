// Gist ID of your public Gist
const GIST_ID = '85b670b23351bf4aaa1e6c37a1a29606';
// URL to fetch Gist content
const GIST_URL = `https://api.github.com/gists/${GIST_ID}`;

// Function to update like count on the UI
function updateLikeCount(likeCount) {
    document.getElementById('likeCount').textContent = likeCount;
}

// Function to handle like button click
async function handleLikeClick() {
    try {
        const response = await fetch(GIST_URL);
        if (response.ok) {
            const gistData = await response.json();
            let likeCount = 0;
            // Extract like count from Gist content
            if (gistData.files && gistData.files['likes.txt']) {
                likeCount = parseInt(gistData.files['likes.txt'].content) || 0;
            }
            // Increment like count
            likeCount++;
            // Update Gist content
            await updateGist(likeCount);
            // Update like count on UI
            updateLikeCount(likeCount);
        } else {
            console.error('Failed to fetch Gist:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Function to update Gist content
async function updateGist(likeCount) {
    const requestBody = {
        files: {
            'likes.txt': {
                content: likeCount.toString()
            }
        }
    };
    const response = await fetch(GIST_URL, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer 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` // Use environment variable
        },
        body: JSON.stringify(requestBody)
    });
    if (!response.ok) {
        console.error('Failed to update Gist:', response.statusText);
    }
}

// Add click event listener to the like button
document.getElementById('likeButton').addEventListener('click', handleLikeClick);
