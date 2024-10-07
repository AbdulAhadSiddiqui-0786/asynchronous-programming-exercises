document.getElementById("callbackButton").addEventListener("click", function() {
    fetchPosts(afterDelay);
});

function fetchPosts(callback) {
    setTimeout(() => {
        fetch("https://dummyjson.com/posts")
            .then(response => response.json())
            .then(data => {
                const titles = data.posts.map(post => post.title).join(", ");
                const resultDiv = document.getElementById("callbackResult");
                resultDiv.innerText = titles;
                resultDiv.style.display = "block"; // Show the card
                callback();
            })
            .catch(error => {
                console.error("Error fetching posts:", error);
            });
    }, 5000); // 5 seconds delay
}

function afterDelay() {
    // Optional: this can be removed if only displaying titles
    console.log("Posts fetched and displayed");
}