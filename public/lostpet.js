document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('lostPostForm');
  const postsContainer = document.getElementById('lostPostsContainer');
  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');

  // Function to fetch and display posts
  const fetchPosts = async (query = '', sort = '') => {
    try {
      const response = await fetch(`/api/lost?q=${query}&sort=${sort}`);
      if (!response.ok) throw new Error('Failed to fetch posts');
      const posts = await response.json();
      postsContainer.innerHTML = '';

      posts.forEach((post) => {
        postsContainer.innerHTML += `
          <div class="post">
            <img src="/uploads/lost/${post.image}" alt="Lost Pet">
            <p>${post.description}</p>
            <p>Posted on: ${new Date(post.createdAt).toLocaleDateString()}</p>
          </div>
        `;
      });
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // Fetch posts on page load
  fetchPosts();

  // Handle form submission for new post
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    try {
      const response = await fetch('/api/lost/create', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        fetchPosts(); // Reload posts
        form.reset();
      } else {
        const error = await response.json();
        console.error('Error creating post:', error);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  });

  // Handle search input
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value;
    const sort = sortSelect.value;
    fetchPosts(query, sort);
  });

  // Handle sort selection
  sortSelect.addEventListener('change', (e) => {
    const query = searchInput.value;
    const sort = e.target.value;
    fetchPosts(query, sort);
  });
});
