// src/components/PostModal.js
import React, { useState } from "react";

export default function PostModal({ isOpen, onClose, onCreate }) {
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (image && caption) {
      onCreate({ image_url: image, caption });
      onClose(); // Close the modal after creating the post
    }
  };

  if (!isOpen) return null; // Don't render if the modal isn't open

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded p-4">
        <h2 className="text-xl font-bold mb-2">Create New Post</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="url"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="border rounded p-2 mb-2 w-full"
            required
          />
          <input
            type="text"
            placeholder="Caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="border rounded p-2 mb-2 w-full"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition duration-300"
          >
            Create Post
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-black rounded p-2 hover:bg-gray-400 transition duration-300 mt-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
