// foundPets.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('foundPostForm');
    const postsContainer = document.getElementById('foundPostsContainer');

    // Fetch and display posts
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/found');
        const posts = await response.json();
        postsContainer.innerHTML = '';

        posts.forEach(post => {
          postsContainer.innerHTML += `
            <div class="post" id="post-${post._id}">
              <h3>${post.title}</h3>
              <img src="/uploads/found/${post.image}" alt="${post.title}">
              <p>${post.description}</p>
            </div>
          `;
        });
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    // Form submission
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const postData = {
        description: formData.get('description'),
        image: formData.get('foundImage'),
      };

      try {
        const response = await fetch('/api/found/create', {
          method: 'POST',
          body: formData, // Send FormData directly
        });

        if (response.ok) {
          fetchPosts(); // Refresh the posts
          form.reset(); // Reset the form
        } else {
          const error = await response.json();
          console.error('Error creating post:', error);
        }
      } catch (error) {
        console.error('Error creating post:', error);
      }
    });

    // Initial fetch
    fetchPosts();
});
