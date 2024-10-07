document.getElementById("promiseButton").addEventListener("click", function() {
    fetchPostsWithPromise()
        .then(titles => {
            const resultDiv = document.getElementById("promiseResult");
            resultDiv.innerText = titles;
            resultDiv.style.display = "block"; // Show the card when the button is clicked
        })
        .catch(error => {
            const resultDiv = document.getElementById("promiseResult");
            resultDiv.innerText = error;
            resultDiv.style.display = "block"; // Show the card in case of an error too
        });
});

function fetchPostsWithPromise() {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            reject("Operation timed out.");
        }, 5000); // 5 seconds timeout

        fetch("https://dummyjson.com/posts")
            .then(response => {
                clearTimeout(timeout);
                return response.json();
            })
            .then(data => {
                const titles = data.posts.map(post => post.title).join(", ");
                resolve(titles);
            })
            .catch(error => reject("Error fetching posts: " + error));
    });
}