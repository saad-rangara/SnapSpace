// app/createProfile/page.js
import { redirect } from "next/navigation";
import { db } from "@/utils/dbConnection";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function CreateProfile() {
  const user = await currentUser();

  if (!user) {
    return <p>Please sign in to create a profile.</p>;
  }

  async function handleSubmit(formData) {
    "use server";

    const profileData = {
      username: formData.get("username"),
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      bio: formData.get("bio"),
      image_src: formData.get("image_src") || null,
    };

    try {
      await db.query(
        `INSERT INTO users (username, first_name, last_name, bio, profile_picture) 
        VALUES ($1, $2, $3, $4, $5)`,
        [
          profileData.username,
          profileData.first_name,
          profileData.last_name,
          profileData.bio,
          profileData.image_src,
        ]
      );

      redirect(`/profile?username=${encodeURIComponent(profileData.username)}`);
    } catch (error) {
      console.error("Error creating profile:", error);
      return {
        error: "Profile creation failed. Please try again.",
      };
    }
  }

  return (
    <div>
      {/* <h1>Create Your Profile</h1> */}
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto p-6 bg-gray rounded-lg shadow-md"
      >
        <h1 className="text-transparent text-center text-2xl bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          Create Profile
        </h1>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">
            <span className="inline-block align-middle">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block"
              >
                <path
                  d="M11 1.5C11 1.22386 10.7761 1 10.5 1C10.2239 1 10 1.22386 10 1.5V4H5V1.5C5 1.22386 4.77614 1 4.5 1C4.22386 1 4 1.22386 4 1.5V4H1.5C1.22386 4 1 4.22386 1 4.5C1 4.77614 1.22386 5 1.5 5H4V10H1.5C1.22386 10 1 10.2239 1 10.5C1 10.7761 1.22386 11 1.5 11H4V13.5C4 13.7761 4.22386 14 4.5 14C4.77614 14 5 13.7761 5 13.5V11H10V13.5C10 13.7761 10.2239 14 10.5 14C10.7761 14 11 13.7761 11 13.5V11H13.5C13.7761 11 14 10.7761 14 10.5C14 10.2239 13.7761 10 13.5 10H11V5H13.5C13.7761 5 14 4.77614 14 4.5C14 4.22386 13.7761 4 13.5 4H11V1.5ZM10 10V5H5V10H10Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span className="inline-block ml-2 align-middle">Username:</span>
            <input
              type="text"
              name="username"
              required
              className="mt-1 block w-full p-2 input input-bordered input-secondary rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className=" mb-1 font-semibold block items-center">
            <span className="inline-block align-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </span>
            <span className="inline-block ml-2 align-middle">First Name:</span>
            <input
              type="text"
              name="first_name"
              required
              className="mt-1 block w-full p-2 input input-bordered input-secondary rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">
            <span className="inline-block align-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </span>
            <span className="inline-block ml-2 align-middle">Last Name:</span>
            <input
              type="text"
              name="last_name"
              required
              className="mt-1 block w-full p-2 input input-bordered input-secondary rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">
            <span className="inline-block align-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>
            </span>
            <span className="inline-block ml-2 align-middle">Biography:</span>
            <textarea
              name="bio"
              placeholder="Tell us about yourself..."
              required
              // className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              className="mt-1 block w-full p-2 textarea textarea-secondary rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">
            <span className="inline-block align-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </span>
            <span className="inline-block ml-2 align-middle">
              Profile Picture URL:
            </span>
            <input
              type="text"
              name="image_src"
              className="mt-1 block w-full p-2 input input-bordered input-secondary rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </label>
        </div>
        <button
          type="submit"
          // className="flex items-center justify-center w-full mt-4 p-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
          className="flex items-center justify-center w-full mt-4 p-2 text-white transition duration-300 bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2"
          >
            <path
              d="M7.5 1C7.22386 1 7 1.22386 7 1.5V6.5H1.5C1.22386 6.5 1 6.72386 1 7C1 7.27614 1.22386 7.5 1.5 7.5H7V12.5C7 12.7761 7.22386 13 7.5 13C7.77614 13 8 12.7761 8 12.5V7.5H13C13.2761 7.5 13.5 7.27614 13.5 7C13.5 6.72386 13.2761 6.5 13 6.5H8V1.5C8 1.22386 7.77614 1 7.5 1Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
          Create Profile
        </button>
      </form>
    </div>
  );
}

<button type="button"> Create Profile</button>;
