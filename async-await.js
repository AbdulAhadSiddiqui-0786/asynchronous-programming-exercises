document.getElementById("asyncButton").addEventListener("click", async function() {
    document.getElementById("asyncResult").innerText = "Loading...";
    try {
        const titles = await fetchPostsAsync();
        document.getElementById("asyncResult").innerText = titles;
    } catch (error) {
        document.getElementById("asyncResult").innerText = error;
    }
});

async function fetchPostsAsync() {
    const timeout = new Promise((_, reject) =>
        setTimeout(() => reject("Operation timed out."), 5000)
    );

    const fetchPosts = fetch("https://dummyjson.com/posts")
        .then(response => response.json())
        .then(data => data.posts.map(post => post.title).join(", "));
        const resultDiv = document.getElementById("asyncResult");
        resultDiv.style.display = "block"; // Show the card

    return Promise.race([fetchPosts, timeout]);
}
