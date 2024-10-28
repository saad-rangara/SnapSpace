// src/app/trending/page.jsx
import { useEffect, useState } from "react";

export default function Trending() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      try {
        const response = await fetch("/trending");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch trending posts", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingPosts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold">Trending Content</h1>
      <ul className="mt-4">
        {posts.map((post) => (
          <li key={post.id} className="border-b py-2">
            <img
              src={post.image_url}
              alt="Post image"
              className="w-full h-auto"
            />
            <p className="text-gray-500">Likes: {post.likes_count}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
