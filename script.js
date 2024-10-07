document.addEventListener("DOMContentLoaded", () => {
    // Callbacks
    document.getElementById('callbackButton').addEventListener('click', function() {
        setTimeout(() => {
            document.getElementById('callbackResult').innerText = 'Callback executed after 5 seconds';
            fetchPostsCallback();
        }, 5000);
    });

    function fetchPostsCallback() {
        fetch('https://dummyjson.com/posts')
            .then(response => response.json())
            .then(data => {
                const titles = data.posts.map(post => post.title).join(', ');
                document.getElementById('callbackResult').innerText += `\nFetched Titles: ${titles}`;
            })
            .catch(error => {
                document.getElementById('callbackResult').innerText += `\nError: ${error.message}`;
            });
    }

    // Promises
    document.getElementById('promiseButton').addEventListener('click', function() {
        const promise = new Promise((resolve, reject) => {
            document.getElementById('promiseResult').innerText = 'Loading...';
            const timeout = setTimeout(() => reject('Operation timed out.'), 5000);

            fetch('https://dummyjson.com/posts')
                .then(response => {
                    clearTimeout(timeout);
                    return response.json();
                })
                .then(data => resolve(data))
                .catch(err => reject(err));
        });

        promise
            .then(data => {
                const titles = data.posts.map(post => post.title).join(', ');
                document.getElementById('promiseResult').innerText = `Fetched Titles: ${titles}`;
            })
            .catch(error => {
                document.getElementById('promiseResult').innerText = `Error: ${error}`;
            });
    });

    // Async/Await
    document.getElementById('asyncButton').addEventListener('click', async function() {
        document.getElementById('asyncResult').innerText = 'Loading...';
        try {
            const response = await fetch('https://dummyjson.com/posts');
            const data = await response.json();
            const titles = data.posts.map(post => post.title).join(', ');
            document.getElementById('asyncResult').innerText = `Fetched Titles: ${titles}`;
        } catch (error) {
            document.getElementById('asyncResult').innerText = `Error: ${error.message}`;
        }
    });
});
