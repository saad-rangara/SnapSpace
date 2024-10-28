import { db } from "@/utils/dbConnection";
import Image from "next/image";

export default async function Home() {
  let posts = [];

  // Fetch posts from the database
  try {
    const { rows } = await db.query(
      "SELECT * FROM posts ORDER BY created_at DESC"
    );
    posts = rows;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return <p>Error fetching posts.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Recent Posts</h1>
      <div className="mt-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="border-b pb-4 mb-4">
              <Image
                src={post.image_url}
                alt="Post image"
                className="w-full h-auto rounded-md"
              />
              <p className="mt-2 text-gray-600">
                Posted on: {new Date(post.created_at).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-violet-500">No posts available.</p>
        )}
      </div>
    </div>
  );
}
