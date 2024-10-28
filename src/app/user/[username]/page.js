// app/username/[username]/page.js
import { db } from "@/utils/dbConnection";

export default async function UserProfile({ params }) {
  const { username } = params;

  let profile;
  try {
    const res = await db.query(
      "SELECT username, first_name, last_name, bio, profile_picture, created_at FROM users WHERE username = $1",
      [username]
    );
    profile = res.rows[0];
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return <p>Error fetching user profile.</p>;
  }

  // Handle case where user is not found
  if (!profile) {
    return <p>User not found.</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-4">{profile.username}</h1>
      {profile.profile_picture && (
        <img
          src={profile.profile_picture}
          alt={`${profile.username}'s profile`}
          className="rounded-full w-32 h-32 mb-4"
        />
      )}
      <h2 className="text-2xl font-semibold mb-2">
        {profile.first_name} {profile.last_name}
      </h2>
      <p className="text-gray-600">{profile.bio}</p>
      <p className="text-violet-500">
        Profile created on: {new Date(profile.created_at).toLocaleString()}
      </p>
    </div>
  );
}
