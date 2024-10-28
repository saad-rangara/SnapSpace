import { db } from "@/utils/dbConnection"; // Database connection
import Image from "next/image"; // Image component
import Link from "next/link"; // Link component

export default async function AllUsersPage() {
  const response = await db.query(`SELECT * FROM user_profile`); // Fetch all user profiles
  const usersData = response.rows; // Get user data

  return (
    <div>
      <h1>List of All Users</h1>
      <div className="flex flex-row gap-4 m-4 flex-wrap justify-center">
        {usersData.map((user) => (
          <div
            className="max-w-xs min-w-72 border-4 border-green-700 p-4 rounded-lg bg-green-50"
            key={user.id}
          >
            <Link
              className="font-bold hover:scale-110 ease-in-out transition-transform duration-300 z-10 inline-block p-1"
              href={`/user/${user.clerk_id}`} // Link to user profile
            >
              User: {user.first_name} {user.last_name}
            </Link>
            <p>{user.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
