// src/components/news/NewsComment.jsx
import React from "react";

const NewsComment = ({ comment }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center justify-between mb-2">
        <p className="font-medium text-gray-800">{comment.userId.name}</p>
        <p className="text-xs text-gray-400">
          {new Date(comment.createdAt).toLocaleString()}
        </p>
      </div>
      <p className="text-gray-700">{comment.text}</p>
    </div>
  );
};

export default NewsComment;

