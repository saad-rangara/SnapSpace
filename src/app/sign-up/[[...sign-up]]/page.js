"use client";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1
        className="text-4x1 font-bold normal-case"
        style={{
          backgroundImage: `linear-gradient(
                    90deg,
                    oklch(var(--s)) 4%,
                    color-mix(in oklch, oklch(var(--s)), oklch(var(--er))) 22%,
                    oklch(var(--p)) 45%,
                    color-mix(in oklch, oklch(var(--p)), oklch(var(--a))) 67%,
                    oklch(var(--a)) 100%
                  )`,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
      >
        Sign Up to the most wonderful website
      </h1>
      <SignUp />
    </div>
  );
}
