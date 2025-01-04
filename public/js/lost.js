document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('lostPostForm');
    const postsContainer = document.getElementById('lostPostsContainer');
  
    // Fetch and display posts
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/lost');
        const posts = await response.json();
        postsContainer.innerHTML = '';
  
        posts.forEach((post) => {
          postsContainer.innerHTML += `
            <div class="post" id="post-${post._id}">
              <h3>${post.description}</h3>
              <img src="/uploads/lost/${post.image}" alt="${post.description}">
              <button onclick="deletePost('${post._id}')">Delete</button>
            </div>
          `;
        });
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
  
    // Delete post
    const deletePost = async (id) => {
      try {
        const response = await fetch(`/api/lost/delete/${id}`, { method: 'DELETE' });
        if (response.ok) {
          document.getElementById(`post-${id}`).remove();
        }
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    };
  
    // Form submission
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const formData = new FormData(form);
  
      try {
        const response = await fetch('/api/lost/create', {
          method: 'POST',
          body: formData, // Send FormData directly
        });
  
        if (response.ok) {
          fetchPosts();
          form.reset();
        } else {
          const error = await response.json();
          console.error('Error creating post:', error);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    });
  
    // Initial fetch
    fetchPosts();
  });
  