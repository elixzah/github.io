
// Function to set like count
function SetLike() {
    // Retrieve like count from local storage or default to 0
    let like = localStorage.getItem('likeCount');
    if (like === null) {
        like = 0;
    }
    document.getElementById('like_count_value').textContent = like;
}

// Increment like count and update UI
function IncrementLikeCount() {
    let currentCount = parseInt(document.getElementById('like_count_value').textContent);
    currentCount++;
    localStorage.setItem('likeCount', currentCount); // Save like count to local storage
    document.getElementById('like_count_value').textContent = currentCount;
}

// Load like count when window loads
window.onload = SetLike;

// Add event listener to like button
document.getElementById('like_button').addEventListener('click', IncrementLikeCount);
