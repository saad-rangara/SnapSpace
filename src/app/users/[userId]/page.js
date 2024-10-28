import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

export default async function UserPage({ params }) {
  const userId = await params.userid;

  const user = await currentUser();
  const followerId = user ? user.id : null;
  const followedId = userId;
  let FollowButton; //only added due to deployment issue in vercel

  const response = await db.query(
    `SELECT * FROM user_profile WHERE clerk_id='${userId}'`
  );
  const profileData = response.rows[0];

  const posts = await db.query(
    `SELECT * FROM user_posts WHERE clerk_id='${userId}'`
  );
  const postData = posts.rows;

  async function handleFollow(followerId, followedId) {
    "use server";
    await db.query(
      `INSERT INTO follows (following_clerk_id, followed_clerk_id) VALUES ('${followerId}', '${followedId}')`
    );
    revalidatePath("/posts");
    redirect("/posts");

    return (
      <div>
        <h1>Welcome to {profileData.first_name}&apos;s Page</h1>
        <div className="my-4 mx-2 flex flex-col gap-2">
          <Link
            className="hover:scale-110 ease-in-out transition-transform duration-300 font-bold bg-green-100 w-fit p-1.5 border-green-800 border-4 rounded-lg my-10"
            href="/user"
          >
            Go back ...
          </Link>
          {followerId && (
            <FollowButton
              handleFollow={handleFollow}
              follower={followerId}
              followed={followedId}
            />
          )}
        </div>

        <section className="flex flex-col justify-center items-center">
          <div className="flex flex-col max-w-xs min-w-72 border-4 border-green-700 p-4 rounded-lg bg-green-50">
            <h2>
              Welcome to the profile page of {profileData.first_name}{" "}
              {profileData.last_name}
            </h2>
            <Image
              alt={profileData.username}
              src={profileData.image_src}
              width={300}
              height={300}
              className="border-green-800 border-4 rounded-2xl"
            />
            <p>Username: {profileData.username}</p>
            <p>Bio: {profileData.bio}</p>
          </div>
        </section>

        <h2>Posts by {profileData.first_name}</h2>
        <div className="flex flex-row gap-4 m-4 flex-wrap justify-center">
          {postData.map((post) => (
            <div
              className="max-w-xs min-w-72 border-4 border-green-700 p-4 rounded-lg bg-green-50"
              key={post.id}
            >
              <p>Date: {new Date(post.date).toLocaleDateString()}</p>
              <Image
                alt={post.topic}
                src={post.image_src}
                quality={100}
                width={100}
                height={100}
                className="border-4 border-yellow-400 rounded-lg"
              />
              <Link
                className="font-bold hover:scale-110 ease-in-out transition-transform duration-300 z-10 inline-block p-1"
                href={`/posts/${userId}/${post.id}`}
              >
                Topic: {post.topic}
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
