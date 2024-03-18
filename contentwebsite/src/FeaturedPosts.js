import React, { useState, useEffect } from 'react';

function FeaturedPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch featured posts from the server and store them in state
    async function fetchFeaturedPosts() {
      const response = await fetch('/api/posts?featured=true');
      const data = await response.json();
      setPosts(data);
    }

    fetchFeaturedPosts();
  }, []);

  return (
    <div>
      <h3>Featured Posts</h3>
      {posts.map(post => (
        <div key={post.id}>
          <h4>{post.title}</h4>
          <img src={post.featuredImage} alt={post.title} />
          <p>{post.summary}</p>
          <a href={`/post/${post.slug}`}>Read More</a>
        </div>
      ))}
    </div>
  );
}

export default FeaturedPosts;