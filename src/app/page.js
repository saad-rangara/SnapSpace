// // import { db } from "@/utils/dbConnection";
// // import PostList from "@/components/PostList"; // Import the PostList component

// // export default async function HomePage() {
// //   // Fetch posts on the server
// //   let posts = [];

// //   try {
// //     const { rows } = await db.query(
// //       "SELECT * FROM posts ORDER BY created_at DESC"
// //     );
// //     posts = rows;
// //   } catch (error) {
// //     console.error("Error fetching posts:", error);
// //   }

// //   return (
// //     <div>
// //       <h1 className="text-3xl font-bold">Recent Posts</h1>
// //       <PostList posts={posts} /> {/* Render the PostList component */}
// //     </div>
// //   );
// // }

// import { useEffect, useState } from "react";
// import { db } from "@/utils/dbConnection";

// export default function Home() {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const { rows } = await db.query(
//           "SELECT * FROM posts ORDER BY created_at DESC"
//         );
//         setPosts(rows);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       }
//     };

//     fetchPosts();
//   }, []);

//   return (
//     <div>
//       <h1 className="text-3xl font-bold">Recent Posts</h1>
//       <div className="mt-4">
//         {posts.map((post) => (
//           <div key={post.id} className="border-b pb-4">
//             <img
//               src={post.image_url}
//               alt="Post image"
//               className="w-full h-auto"
//             />
//             <p>Posted on: {new Date(post.created_at).toLocaleDateString()}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// app/page.js (or wherever your main page is located)
import { db } from "@/utils/dbConnection";

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
              <img
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
