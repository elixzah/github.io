// Function to set like count
function SetLike() {
    let like = localStorage.getItem('likeCount');
    if (like === null) {
        like = 0;
    }
    document.getElementById('like_count_value').textContent = like;

    let lastUpdate = localStorage.getItem('lastUpdate');
    if (lastUpdate === null) {
        // If lastUpdate is null, set it to current date
        localStorage.setItem('lastUpdate', new Date().toISOString());
    } else {
        // If lastUpdate exists, check if it's been more than a day
        let lastUpdateDate = new Date(lastUpdate);
        let currentDate = new Date();
        if (currentDate.getDate() !== lastUpdateDate.getDate() || currentDate.getMonth() !== lastUpdateDate.getMonth() || currentDate.getFullYear() !== lastUpdateDate.getFullYear()) {
            // If it's a new day, increment like by 5 and update lastUpdate
            IncrementLikeCount(5);
            localStorage.setItem('lastUpdate', new Date().toISOString());
        }
    }
}

// Increment like count and update UI
function IncrementLikeCount(likeIncrement) {
    let currentCount = parseInt(document.getElementById('like_count_value').textContent);
    currentCount += likeIncrement;
    localStorage.setItem('likeCount', currentCount);
    document.getElementById('like_count_value').textContent = currentCount;
}

// Load like count when window loads
window.onload = SetLike;

// Add event listener to like button
document.getElementById('like_button').addEventListener('click', function() {
    IncrementLikeCount(1); // Increment by 1 when like button is clicked
    // set button as disabled after click button 
    document.getElementById('like_button').disabled = true;
});
