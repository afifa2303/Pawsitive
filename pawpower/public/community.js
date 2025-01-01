const API_URL = '/api/community';

// Fetch and display posts
async function fetchPosts() {
    const postsDiv = document.getElementById('posts');
    postsDiv.innerHTML = '<p>Loading...</p>'; 

    try {
        const response = await fetch(API_URL);
        const posts = await response.json();

        postsDiv.innerHTML = ''; 

        if (posts.length === 0) {
            postsDiv.innerHTML = '<p>No posts available. Be the first to share!</p>';
            return;
        }

        posts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.classList.add('post');
            postDiv.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <p><strong>By:</strong> ${post.author}</p>
                <p><small>${new Date(post.date).toLocaleString()}</small></p>
            `;
            postsDiv.appendChild(postDiv);
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
        postsDiv.innerHTML = '<p>Error loading posts. Please try again later.</p>';
    }
}

// Handle new post submission
document.getElementById('new-post-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value.trim();
    const content = document.getElementById('content').value.trim();
    const author = document.getElementById('author').value.trim();

    // Validate input
    if (!title || !content || !author) {
        alert('All fields are required to submit a post.');
        return;
    }

    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content, author })
        });
        fetchPosts(); // Reload posts after submission
        e.target.reset(); 
    } catch (error) {
        console.error('Error creating post:', error);
        alert('Failed to submit post. Please try again later.');
    }
});

// Load posts on page load
fetchPosts();