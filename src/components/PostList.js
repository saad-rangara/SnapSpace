export default function PostList({ posts }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <div key={post.id} className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p>{post.description}</p>
          <button className="mt-2 bg-pink-600 text-white px-4 py-2 rounded">
            View Post
          </button>
        </div>
      ))}
    </div>
  );
}
